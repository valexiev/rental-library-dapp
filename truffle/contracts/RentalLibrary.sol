pragma solidity ^0.4.19;

contract RentalLibrary {

    mapping(address => uint) public arbitratorsIndexes;
    address[] public arbitrators;

    struct Book {
        address owner;
        bytes32 ISBN;

        // Deal
        address reader;
        uint deposit;
        uint pricePerDay;
        uint borrowTime;
        uint borrowDays;

        // Book condition
        bool hasCovers;
        bool hasAllPages;
        bool isStrikedThrough;
        bool isShabby;

        // Indexes
        uint bookOwnerIndex;
        uint ISBNmapIndex;
    }

    mapping(uint => Book) public books;
    mapping(address => uint[]) public bookOwners;

    mapping(bytes32 => uint[]) public ISBNmap;
    bytes32[] public ISBNarr;


    // MODIFIERS

    modifier isArbitrator {
        require(arbitratorsIndexes[msg.sender] > 0);
        _;
    }

    modifier isBookOwner(uint bookID) {
        require(msg.sender == books[bookID].owner);
        _;
    }

    modifier isBookAvailable(uint bookID) {
        require(books[bookID].reader == 0);
        _;
    }


    // EVENTS

    event LogOfferedBook(uint indexed bookID, bytes32 ISBN);
    event LogRentedBook(uint indexed bookID, bytes32 ISBN);
    event LogReturnedBook(uint indexed bookID, bytes32 ISBN);
    event LogRemovedBook(uint indexed bookID, bytes32 ISBN);


    // CONSTRUCTOR

    function RentalLibrary() public {
        address msgSender = msg.sender;
        arbitrators.push(msgSender);
        arbitratorsIndexes[msgSender] = 1;
    }


    // METHODS

    function() payable public {}

    // Books

    function addBook(bytes32 ISBN, uint pricePerDay, uint borrowDays, bool hasCovers, bool hasAllPages, bool isStrikedThrough, bool isShabby) public returns(uint) {
        uint bookID = now;
        address bookOwner = msg.sender;
        uint ISBNmapIndex = ISBNmap[ISBN].length;
        uint bookOwnerIndex = bookOwners[bookOwner].length;

        books[bookID] = Book({owner: bookOwner, ISBN: ISBN, reader: 0, deposit: 0, pricePerDay: pricePerDay, borrowTime: 0, borrowDays: borrowDays, hasCovers: hasCovers, hasAllPages: hasAllPages, isStrikedThrough: isStrikedThrough, isShabby: isShabby, ISBNmapIndex: ISBNmapIndex, bookOwnerIndex: bookOwnerIndex});

        bookOwners[bookOwner].push(bookID);
        ISBNmap[ISBN].push(bookID);
        ISBNarr.push(ISBN);

        LogOfferedBook(bookID, ISBN);

        return bookID;
    }

    function removeBook(uint bookID) public isBookOwner(bookID) isBookAvailable(bookID) {
        deleteBook(bookID);
    }

    function rentBook(uint bookID) payable public isBookAvailable(bookID) {
        Book storage book = books[bookID];
        uint msgValue = msg.value;

        require(msgValue >= (book.pricePerDay * book.borrowDays * 5 * 3) && book.reader != 0);

        book.reader = msg.sender;
        book.deposit = (msgValue * 995) / 100; // The contract gets a fee of 0.5%
        book.borrowTime = now;

        LogRentedBook(bookID, book.ISBN);
    }

    function acceptBackBook(uint bookID, bool hasCovers, bool hasAllPages, bool isStrikedThrough, bool isShabby) public isBookOwner(bookID) {

        Book storage book = books[bookID];

        uint reward = 0;
        uint change = 0;
        uint usageDays = (now - book.borrowTime)/ 1 days;
        int256 extraUsageDays = int32(usageDays - book.borrowDays);
        uint penalty = book.pricePerDay * book.borrowDays * 5 * 2;

        if ((book.hasCovers && !hasCovers)) {
            // Lose half of the deposit
            reward += penalty;
        }

        if ((book.hasAllPages && !hasAllPages)) {
            // Lose half of the deposit
            reward += penalty;
        }

        if ((book.isStrikedThrough && !isStrikedThrough)) {
            // Lose half of the deposit
            reward += penalty;
        }

        if (extraUsageDays > 0) {
            reward += (book.borrowDays * book.pricePerDay + uint(extraUsageDays) * book.pricePerDay * 3);
        } else {
            reward += (usageDays * book.pricePerDay);
        }

        if (reward > book.deposit) {
            book.owner.transfer(book.deposit);
        } else {
            book.owner.transfer(reward);
            change = book.deposit - reward;
            book.reader.transfer(change);
        }

        book.hasCovers = hasCovers;
        book.hasAllPages = hasAllPages;
        book.isStrikedThrough = isStrikedThrough;
        book.isShabby = isShabby;
        book.reader = 0;
        book.deposit = 0;

        LogReturnedBook(bookID, book.ISBN);
    }


    function deleteBook(uint bookID) private {
        Book storage book = books[bookID];
        address bookOwner = book.owner;

        // bookOwners
        uint index = book.bookOwnerIndex;
        uint[] storage bookOwnerBooks = bookOwners[bookOwner];
        uint lastBookID = bookOwnerBooks[bookOwnerBooks.length - 1];
        bookOwnerBooks[index] = lastBookID;
        books[lastBookID].bookOwnerIndex = index;
        bookOwnerBooks.length--;

        // ISBN
        index = book.ISBNmapIndex;
        uint[] storage ISBNBookInstances = ISBNmap[book.ISBN];
        lastBookID = ISBNBookInstances[ISBNBookInstances.length - 1];
        ISBNBookInstances[index] = lastBookID;
        books[lastBookID].ISBNmapIndex = index;
        ISBNBookInstances.length--;

        LogRemovedBook(bookID, book.ISBN);
        delete books[bookID];
    }

    function getISBNlen() public view returns (uint) {
        return ISBNarr.length;
    }

    function getISBNs() public view returns (bytes32[]) {
        return ISBNarr;
    }


    // Arbitrate issues

    function resolveNotReturnedBook(uint bookID) public isArbitrator {
        Book storage book = books[bookID];
        book.owner.transfer(book.deposit);
        LogRemovedBook(bookID, book.ISBN);
        delete books[bookID];
    }

    function resolveUnresponsiveOwner(uint bookID) public isArbitrator {
        Book storage book = books[bookID];
        uint reward = book.pricePerDay * book.borrowDays;
        uint change = book.deposit - reward;
        book.owner.transfer(reward);
        book.reader.transfer(change);
        deleteBook(bookID);
    }


    // Manage Arbitrators

    function addArbitrator(address arbitrator) public isArbitrator {
        require(arbitratorsIndexes[arbitrator] == 0 && arbitrator != arbitrators[0]);
        arbitrators.push(arbitrator);
        arbitratorsIndexes[arbitrator] = arbitrators.length - 1;
    }

    function removeArbitrator(address arbitrator) public isArbitrator {
        require(arbitrators.length > 1);
        uint index = arbitratorsIndexes[arbitrator];
        address arbitratorToMove = arbitrators[arbitrators.length - 1];
        arbitrators[index] = arbitratorToMove;
        arbitratorsIndexes[arbitratorToMove] = index;
        arbitrators.length--;
        delete arbitratorsIndexes[arbitrator];
    }

    function getArbitrators() public view returns (address[]) {
        return arbitrators;
    }
}
