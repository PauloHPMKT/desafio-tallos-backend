db.createUser({
//  user: 'root',
//  pwd: 'root',
  roles: [
    {
      role: 'readWrtie',
      db: 'user-database',
    },
  ],
});