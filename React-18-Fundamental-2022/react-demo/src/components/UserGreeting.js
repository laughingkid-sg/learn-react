export const UserGreeting = () => {
    const isLoggedIn = true;
    // return <div>Welcome {isLoggedIn ? 'Zen' : 'Guest'}</div>
    return <div>Welcome {isLoggedIn && 'Zen'}</div>
}