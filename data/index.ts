
const users = [
    {
        avatar : 'https://www.spencerclarkegroup.co.uk/uploads/5005001.png',
        verified : true,
        userName : 'Ali ben salah',
        description : 'Professeur',
        id : '0001',
        stats : {
            followers : '4005',
            posts : 21,
            rank : 15
        }
    },
    {
        avatar : 'https://www.vousnousils.fr/wp-content/uploads/2023/05/GettyImages-1402076608-1024x683.jpg',
        verified : true,
        userName : 'Mouhamed salmi',
        description : 'Math professeur',
        id : '0002',
        stats : {
            followers : '20',
            posts : 10,
            rank : 2
        }
    },
    {
        avatar : 'https://img.freepik.com/free-photo/front-view-male-student-wearing-black-backpack-holding-copybooks-files-blue-wall_140725-42636.jpg?w=826&t=st=1714866799~exp=1714867399~hmac=fca8e3ac37c83027dd05c33f309588ab09ab94acbe7fea6ce5959af48668ec3b',
        verified : true,
        userName : 'Ali ben salah',
        description : 'computer science student',
        id : '0003',
        stats : {
            followers : '100k',
            posts : 254,
            rank : 2
        }
    },
    {
        avatar : 'https://www.wlc.ac.uk/wp-content/uploads/2023/07/esol-writing-1024x683.jpg',
        verified : true,
        userName : 'Triki ahmed',
        description : 'Software engineer',
        id : '0004',
        stats : {
            followers : '1201',
            posts : 12,
            rank : 30
        }
    },
    {
        avatar : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnlarish1qqCNJ9-YRsFpNlmrX6JSPBqZMmGmtzB0DRg&s',
        verified : false,
        userName : 'Tarak ben salem',
        description : 'Ai Student',
        id : '0005',
        stats : {
            followers : '185',
            posts : 1,
            rank : 300
        }
    },
    {
        avatar : 'https://as2.ftcdn.net/v2/jpg/03/85/50/01/1000_F_385500115_T8QiYsPeliQ5tE3npwOuJNUfunqFBo1U.jpg',
        verified : true,
        userName : 'Salma triki',
        description : 'computer science student',
        id : '0006',
        stats : {
            followers : '1085',
            posts : 5,
            rank : 100
        }
    },
    {
        avatar : 'data:image/png;base64,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',
        verified : true,
        userName : 'Taki academy',
        description : 'المنصّة التعليميّة الأولى',
        id : '0007',
        stats : {
            followers : '300k',
            posts : 23,
            rank : 1
        }
    }
]


export const findUser = (id : string) => users?.find((user)=>user.id === id)
