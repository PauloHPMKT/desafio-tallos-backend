db.createUser({
  roles: [
    {
      role: 'readWrtie',
      db: 'user-database',
    },
  ],
});