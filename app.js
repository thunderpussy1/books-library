const root = document.getElementById('root');

class Book {
    constructor (book) {
        this.title = book.title;
        this.author = book.author;
        this.imageUrl = book.imageUrl;
        this.plot = book.plot;
        this.id = book.id;
    }

    showPreview() {
        location.hash = 'preview';
        location.search = this.id;
    }

    openEdit(event){
        event.stopPropagation();
        location.hash = 'edit';
        location.search = this.id;
    }

    edit(book){
        this.title = book.title;
        this.author = book.author;
        this.imageUrl = book.imageUrl;
        this.plot = book.plot;
    }

    createBookItem(){
        const bookWrapper = document.createElement('div');
        bookWrapper.classList.add('books_list__node');
        bookWrapper.addEventListener('click', this.showPreview.bind(this));

        const title = document.createElement('div');
        const textNodeTitle = document.createTextNode(this.title);
        title.classList.add('books_list__node_title');
        title.appendChild(textNodeTitle);

        const buttonEdit = document.createElement('button');
        buttonEdit.textContent = 'Edit';
        buttonEdit.classList.add('books_list__node_button');
        buttonEdit.addEventListener('click', this.openEdit.bind(this));

        bookWrapper.appendChild(title);
        bookWrapper.appendChild(buttonEdit);

        return bookWrapper;
    }
}

class List {
    constructor(books) {
        this.books = books.map(book => new Book(book));
    }

    createBook(book) {
        this.books.push(new Book(book));
    }

    update(id, book) {
        this.books.find(book => book.id === id).edit(book);
    }

    createBookList() {
        const listWrapper = document.createElement('div');
        listWrapper.classList.add('books_list');
        this.books.forEach(book => {
            const bookItem = book.createBookItem();
            listWrapper.appendChild(bookItem);
        });

        const add = document.createElement('button');
        add.textContent = 'Add';
        add.addEventListener('click', this.openAddForm);
        add.classList.add('buttonAdd')
        listWrapper.appendChild(add);

        return listWrapper;
    }

    openAddForm() {
        location.hash = 'add';
        location.search = '';
    }
}

class App {
    constructor(root) {
        this.root = root;
        this.init();
    }

    init() {
        this.list = new List(JSON.parse(localStorage.getItem('localBooks')));
        this.root.appendChild(this.list.createBookList());
        this.preview = new Preview(this.root, this.list.books);
        window.addEventListener('hashchange', () => this.preview.renderPreview());
    }
}

class Preview {
    constructor(root, books) {
        this.root = root;
        this.books = books;
        this.createContainerForPreview();
        this.renderPreview();
    }

    createContainerForPreview() {
        const preview = document.createElement('div');
        preview.classList.add('books_preview');
        preview.setAttribute('id', 'preview');
        this.root.appendChild(preview);
    }

    getPreview() {
        return document.getElementById('preview');
    }

    add() {
        this.clearPreview();
        this.getPreview().appendChild(this.createForm());
    }

    previewBook() {
        const currentBook = this.books.find((book) => book.id == location.search.substring(1)); 
        this.clearPreview();
        this.getPreview().appendChild(this.createPreview(currentBook));
    }

    createPreview(currentBook) {
        const element = document.createElement('div');
        element.classList.add('book_preview__node');

        const title = document.createElement('h1');
        const textNodeTitle = document.createTextNode(currentBook.title);
        title.classList.add('book_preview__node_title');
        title.appendChild(textNodeTitle);

        const author = document.createElement('h3');
        const textNodeAuthor = document.createTextNode(currentBook.author);
        author.classList.add('book_preview__node_author');
        author.appendChild(textNodeAuthor);

        const image = document.createElement('img');
        image.setAttribute('src', currentBook.imageUrl);
        image.classList.add('book_preview__node_image');

        const plot = document.createElement('p');
        const textNodePlot = document.createTextNode(currentBook.plot);
        plot.classList.add('book_preview__node_plot');
        plot.appendChild(textNodePlot);

        element.appendChild(title);
        element.appendChild(author);
        element.appendChild(image);
        element.appendChild(plot);

        return element;
    }

    edit() {
        const currentBook = this.books.find((book) => book.id == location.search.substring(1)); 
        this.clearPreview();
        this.getPreview().appendChild(this.createForm(currentBook));  
    }

    clearPreview() {
        while (this.getPreview().firstChild) {
            this.getPreview().removeChild(this.getPreview().firstChild);
        } 
    }

    createForm(formValue) {

        const element = document.createElement('form');
        element.classList.add('book_preview__node_edit');
        element.addEventListener('submit', this.submit.bind(this));

        const title = document.createElement('label');
        title.innerText = 'Title: ';
        const titleInput = document.createElement('input');
        titleInput.setAttribute('type', 'text');
        titleInput.setAttribute('name', 'title');
        titleInput.value = (formValue && formValue.title) || '';
        
        const author = document.createElement('label');
        author.innerText = 'Author: ';
        const authorInput = document.createElement('input');
        authorInput.setAttribute('type', 'text');
        authorInput.setAttribute('name', 'author');
        authorInput.value = (formValue && formValue.author) || '';   

        const image = document.createElement('label');
        image.innerText = 'Image URL: ';
        const imageInput = document.createElement('input');
        imageInput.setAttribute('type', 'text');
        imageInput.setAttribute('name', 'imageUrl');
        imageInput.value = (formValue && formValue.imageUrl) || '';  

        const plot = document.createElement('label');
        plot.innerText = 'Plot: ';
        const plotTextarea = document.createElement('textarea');
        plotTextarea.value = formValue && formValue.plot || '';  
        plotTextarea.setAttribute('name', 'plot');

        const buttonSave = document.createElement('input');
        buttonSave.value = 'Save';
        buttonSave.classList.add('button_save');
        buttonSave.setAttribute('type', 'submit');

        const buttonCancel = document.createElement('button');
        buttonCancel.textContent = 'Cancel';
        buttonCancel.classList.add('button_cancel');
        buttonCancel.addEventListener('click', this.buttonCancel.bind(this));

        element.appendChild(title);
        element.appendChild(titleInput);
        element.appendChild(author);
        element.appendChild(authorInput);
        element.appendChild(image);
        element.appendChild(imageInput);
        element.appendChild(plot);
        element.appendChild(plotTextarea);
        element.appendChild(buttonSave);
        element.appendChild(buttonCancel);

        return element;

    }

    buttonCancel(event) {
        event.preventDefault();
        let confirmChoose = confirm('Discard changes?');
                if (confirmChoose) {
                    window.history.go(-2) ; 
                }
    }

    submit(event) {
        event.preventDefault();
        const book = {};
        const createId = () => {
            return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
              (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
            );
        }
        const currentId = location.search.substring(1);
        const formData = new FormData(event.target);
        for (const pair of formData.entries()) {
            book[pair[0]] = pair[1];
        }
        if (currentId) {
            const index = this.books.findIndex(currentBook => currentBook.id == currentId);
            book.id = currentId;
            this.books[index] = new Book(book);
            localStorage.setItem('localBooks', JSON.stringify(this.books));
            location.hash = 'preview';
            location.search = currentId;
        } else {
            book.id = createId();
            localStorage.setItem('localBooks', JSON.stringify([...this.books, book]));
            location.hash = 'preview';
            location.search = book.id;
        }
    }

    renderPreview() {
        switch (location.hash) {
            case '#add':
                this.add();
                break;
            case '#preview':
                this.previewBook();
                break;
            case '#edit':
                this.edit();
                break;
            default:
                console.log('404');
                break;
        }
    }

}

const app = new App(root);
