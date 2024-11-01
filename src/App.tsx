import { useEffect, useRef, useState } from "react";

export const App = () => {
    const playerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [moving, setMoving] = useState<string | null>(null); // Almacena la dirección del movimiento

    // Función para mover el jugador en la dirección especificada
    document.oncontextmenu = () => false;
    const movePlayer = () => {

        const playerSpeed = 1;
        if (moving) {
            setPosition((prev) => {
                if (moving === "up") return { x: prev.x, y: prev.y - playerSpeed };
                else if (moving === "down") return { x: prev.x, y: prev.y + playerSpeed };
                else if (moving === "left") return { x: prev.x - playerSpeed, y: prev.y };
                else if (moving === "right") return { x: prev.x + playerSpeed, y: prev.y };
                else return prev;
            });
        }
    };

    // Usar efecto para mover al jugador mientras se mantenga la dirección
    useEffect(() => {
        const interval = setInterval(movePlayer, 5); // Mueve cada 100 ms

        return () => {
            clearInterval(interval); // Limpia el intervalo al desmontar
        };
    }, [moving]);

    // Actualiza el estilo del jugador con la posición
    useEffect(() => {
        const player = playerRef.current;
        if (player) {
            player.style.left = `${position.x}px`;
            player.style.top = `${position.y}px`;
        }
    }, [position]);

    // Manejo de eventos para los botones de dirección
    const handlePointerDown = (direction: string) => {
        setMoving(direction);
    };

    const handlePointerUp = () => {
        setMoving(null);
    };

    return (
        <div className="h-screen">
            <div className="h-4/5 p-3 relative">
                <div
                    ref={playerRef}
                    className="p-4 absolute bg-zinc-300 w-max"
                    style={{ left: `${position.x}px`, top: `${position.y}px` }}
                >
                    Player
                </div>
            </div>
            <div className="flex absolute z-50 items-center gap-x-2 bg-zinc-500 justify-center pl-4 w-full h-1/5">
                <div className="flex items-center w-full h-full">
                    <div>
                        <div className="flex items-center justify-center">
                            <div
                                onPointerDown={() => handlePointerDown("up")}
                                onPointerUp={handlePointerUp}
                                className="bg-white px-6 py-4 mb-2 rounded-lg text-2xl hover:bg-white/90 select-none"
                            >
                                ↑
                            </div>
                        </div>
                        <div className="flex gap-x-2 justify-between">
                            <div
                                onPointerDown={() => handlePointerDown("left")}
                                onPointerUp={handlePointerUp}
                                className="bg-white px-6 py-4 rounded-lg text-2xl font-semibold select-none"
                            >
                                ←
                            </div>
                            <div
                                onPointerDown={() => handlePointerDown("down")}
                                onPointerUp={handlePointerUp}
                                className="bg-white px-6 py-4 rounded-lg text-2xl font-semibold select-none"
                            >
                                ↓
                            </div>
                            <div
                                onPointerDown={() => handlePointerDown("right")}
                                onPointerUp={handlePointerUp}
                                className="bg-white px-6 py-4 rounded-lg text-2xl font-semibold select-none"
                            >
                                →
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full h-full">
                    <div className="flex gap-x-2">
                        <div className="bg-green-400 px-6 py-4 rounded-lg font-semibold">E</div>
                        <div className="bg-red-400 px-6 py-4 rounded-lg font-semibold">B</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
