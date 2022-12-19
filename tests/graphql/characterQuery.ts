import { query } from '../../src';

const characterQuery = query`
    Character($id: Int) {
        Character(id: $id) {
            id
            name {
                first
                last
            }
            gender
            age
        }
    }
`;

export default characterQuery;
