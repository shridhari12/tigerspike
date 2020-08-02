import { UserInfo } from './user-info.model';

export const MOCK_USERS: Array<UserInfo> = [
    {
        id: '79b9d57b-99cd-47db-a29e-2c9fdf0bfb02',
        firstName: 'Shridhar',
        lastName: 'Iyer',
        email: 'shridhariyer12@gmail.com',
        locations: [
            {
                id: '5d061d46-a23e-44eb-a89c-c7333dc08edb',
                userId: '79b9d57b-99cd-47db-a29e-2c9fdf0bfb02',
                addressLine1: 'Unit 9',
                addressLine2: '158 Victoria Road',
                suburb: 'Hawthorn East',
                city: 'Melbourne',
                state: 'VIC',
                country: 'Australia',
                postcode: '3123',
                isCurrent: false,
                notes: null,
                latitude: -37.823521,
                longitude: 145.056717
            },
            {
                id: '632fc6c8-b529-42a5-8293-c1540fb7d43e',
                userId: '79b9d57b-99cd-47db-a29e-2c9fdf0bfb02',
                addressLine1: '86',
                addressLine2: 'Chilton Street',
                suburb: 'Sunnybank Hills',
                city: 'Brisbane',
                state: 'QLD',
                country: 'Australia',
                postcode: '4109',
                isCurrent: false,
                notes: null,
                latitude: -27.58873,
                longitude: 153.050156
            },
            {
                id: 'b7a40625-4368-4408-b5f0-7e8775da4196',
                userId: '79b9d57b-99cd-47db-a29e-2c9fdf0bfb02',
                addressLine1: '76',
                addressLine2: 'Wilcox Street',
                suburb: 'Preston',
                city: 'Melbourne',
                state: 'VIC',
                country: 'Australia',
                postcode: '3072',
                isCurrent: false,
                notes: null,
                latitude: -37.7358,
                longitude: 145.00651
            },
            {
                id: 'fe13cb78-20a7-4fd4-a198-b5255d7c81dc',
                userId: '79b9d57b-99cd-47db-a29e-2c9fdf0bfb02',
                addressLine1: '999',
                addressLine2: 'Burke Road',
                suburb: 'Camberwell',
                city: 'Melbourne',
                state: 'VIC',
                country: 'Australia',
                postcode: '3124',
                isCurrent: false,
                notes: null,
                latitude: -37.82233,
                longitude: 145.05819
            }
        ]
    }
];
