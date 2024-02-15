
const MockDB = {
    users: [
        { username: 'user1', password: 'password1' },
        { username: 'user2', password: 'password2' },
    ],
    tasks: [
        { id: '1', username: 'user1', content: 'my task1', order: 1 },
        { id: '2', username: 'user1', content: 'my task2', order: 2 }
    ]
}

module.exports = MockDB;