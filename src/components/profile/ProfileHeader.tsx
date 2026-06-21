export function ProfileHeader() {
    // Mock data
    const user = {
        name: "Ram Singh",
        bio: "Farmer from Punjab. I specialize in wheat and rice cultivation.",
        avatar: "/placeholder.svg?text=RS"
    }

    return (
        <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg">
            <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full" />
            <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p>{user.bio}</p>
            </div>
        </div>
    )
}