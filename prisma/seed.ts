import { db } from '../src/utils/db.server';

interface Author {
  first_name: string;
  last_name: string;
}

interface Book {
  title: string;
  if_fiction: boolean;
  date_published: Date;
}

function getAuthors(): Array<Author> {
  return [
    { first_name: 'Steven', last_name: 'Spielberg' },
    { first_name: 'Stanley', last_name: 'Kubrick' },
    { first_name: 'Christopher', last_name: 'Nolan' },
    { first_name: 'James ', last_name: 'Cameron' },
    { first_name: 'William', last_name: 'Shakespeare' },
    { first_name: 'J. K.', last_name: 'Rowling' },
    { first_name: 'J. R. R.', last_name: ' Tolkien' },
  ];
}

function getBooks(): Array<Book> {
  return [
    {
      title: 'Romeo and Juliet',
      if_fiction: true,
      date_published: new Date('August 19, 1975'),
    },
    {
      title: `Harry Potter and the Philosopher's Stone`,
      if_fiction: true,
      date_published: new Date('June 26, 1997'),
    },
    {
      title: 'Avatar: The Way of Water',
      if_fiction: true,
      date_published: new Date('December 16, 2022 '),
    },
    {
      title: 'Ready Player One',
      if_fiction: true,
      date_published: new Date('March 29, 2018 '),
    },
    {
      title: 'Interstellar',
      if_fiction: true,
      date_published: new Date('October 26, 2014 '),
    },
    {
      title: '2001: A Space Odyssey',
      if_fiction: true,
      date_published: new Date('April 2, 1968'),
    },
    {
      title: 'Romeo and Juliet',
      if_fiction: true,
      date_published: new Date('August 19, 1975'),
    },
  ];
}

async function seed() {
  await Promise.all(
    getAuthors().map(({ first_name, last_name }) =>
      db.author.create({ data: { first_name, last_name } })
    )
  );

  const author = await db.author.findFirst({
    where: { first_name: 'Christopher' },
  });

  await Promise.all(
    getBooks().map((book) => {
      const { title, if_fiction, date_published } = book;
      return db.book.create({
        data: { title, if_fiction, date_published, author_id: author.id },
      });
    })
  );
}

seed();
