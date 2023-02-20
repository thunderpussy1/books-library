let books = [
    {
        id: 0,
        title: "Harry Potter and the Philosopher's Stone",
        author: "J. K. Rowling",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg",
        plot: `Harry Potter lives with his abusive aunt and uncle, Vernon and Petunia Dursley and their bullying son, Dudley. 
            On Harry's eleventh birthday, a half-giant named Rubeus Hagrid personally delivers an acceptance letter to 
            Hogwarts School of Witchcraft and Wizardry, revealing that Harry's parents, James and Lily Potter, were wizards. 
            When Harry was one year old, an evil and powerful dark wizard, Lord Voldemort, murdered his parents. Harry survived 
            Voldemort's killing curse that rebounded and seemingly destroyed the Dark Lord, leaving a lightning bolt-shaped scar 
            on Harry's forehead. Unknown to Harry, he is famous in the wizarding world.`,
    },
    {
        id: 1,
        title: "The Da Vinci Code",
        author: "Dan Brown",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/DaVinciCode.jpg/220px-DaVinciCode.jpg",
        plot: `Louvre curator and Priory of Sion grand master Jacques Saunière is fatally shot one night at the museum by 
            an albino Catholic monk named Silas, who is working on behalf of someone he knows only as the Teacher, who wishes to 
            discover the location of the "keystone," an item crucial in the search for the Holy Grail.`,
    },
    {
        id: 2,
        title: "Fifty Shades of Grey",
        author: "E. L. James",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/50ShadesofGreyCoverArt.jpg/220px-50ShadesofGreyCoverArt.jpg",
        plot: `Twenty-one-year-old Anastasia "Ana" Steele is an English literature major at the Washington State University's branch 
            campus in Vancouver, Washington. Her best friend, Katherine "Kate" Kavanagh, writes for the college newspaper. Due to 
            an illness, Kate is unable to interview Christian Grey, a successful and wealthy Seattle entrepreneur. She asks Ana to take 
            her place. Ana finds the 27-year-old Christian both attractive and intimidating. She stumbles through the interview and 
            believes it went poorly. Ana, not expecting to meet Christian again, is surprised when he appears at the hardware store 
            where she works and purchases various items. When Ana mentions that Kate would like a photo for her article, Christian 
            offers to arrange a photo session.`,
    }
];

if (localStorage.getItem('localBooks') === null) {
    localStorage.setItem('localBooks', JSON.stringify(books));
}
