export function Greeting() {
    // Mock data
    const user = { name: "Kisan" };

    return (
        <div className="bg-green-600 text-white p-8 rounded-lg mb-8">
            <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
            <p>Here's what's happening on your farm today.</p>
        </div>
    )
}