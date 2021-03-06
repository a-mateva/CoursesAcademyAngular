export default interface UserInterface {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    isBlocked: boolean;
    courses?: number[];
}