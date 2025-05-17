import Image from "next/image";

export default function Siderbar(){
    const name = ''
    const img = ''
    return(
        <aside className="h-screen w-64 bg-gray-700 text-white flex flex-col p-4">
            <Image
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-2 border-white"
                alt={name}
                src={img}
                width={128}
                height={128}
            />
            <h2 className="text-xl font-bold mb-6 text-center">Ім'я користувача</h2>
            <nav className="flex flex-col space-y-2">
                <a href="#" className="hover:bg-gray-700 px-4 py-2 rounded transition-colors">Головна</a>
                <a href="#" className="hover:bg-gray-700 px-4 py-2 rounded transition-colors">Профіль</a>
                <a href="#" className="hover:bg-gray-700 px-4 py-2 rounded transition-colors">Налаштування</a>
                <a href="#" className="hover:bg-gray-700 px-4 py-2 rounded transition-colors">Вихід</a>
            </nav>
        </aside>
    )
}