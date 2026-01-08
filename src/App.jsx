import { useState, useEffect } from "react";

export default function ListaTareasSubtareas() {

    /* =======================
       STATE
    ======================= */
    const [tareas, setTareas] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editSubIndex, setEditSubIndex] = useState(null);
    const [inputTarea, setInputTarea] = useState("");
    const [subInputs, setSubInputs] = useState({});

    /* =======================
       EFFECTS
    ======================= */
    useEffect(() => {
        const data = localStorage.getItem("tareas-sub");
        if (data) setTareas(JSON.parse(data));
    }, []);

    useEffect(() => {
        localStorage.setItem("tareas-sub", JSON.stringify(tareas));
    }, [tareas]);

    /* =======================
       HANDLERS
    ======================= */
    const agregarTarea = () => {
        if (!inputTarea.trim()) return;

        setTareas([
            ...tareas,
            { texto: inputTarea.trim(), subtareas: [] }
        ]);

        setInputTarea("");
    };

    const eliminarTarea = (i) => {
        setTareas(tareas.filter((_, index) => index !== i));
    };

    const agregarSubtarea = (i) => {
        const texto = subInputs[i]?.trim();
        if (!texto) return;

        setTareas(
            tareas.map((t, index) =>
                index === i
                    ? { ...t, subtareas: [...t.subtareas, texto] }
                    : t
            )
        );

        setSubInputs({ ...subInputs, [i]: "" });
    };

    const eliminarSubtarea = (i, si) => {
        setTareas(
            tareas.map((t, index) =>
                index === i
                    ? {
                        ...t,
                        subtareas: t.subtareas.filter((_, s) => s !== si)
                    }
                    : t
            )
        );
    };

    const guardarEdicion = (i, texto) => {
        if (!texto.trim()) return;

        setTareas(
            tareas.map((t, index) =>
                index === i ? { ...t, texto } : t
            )
        );

        setEditIndex(null);
    };

    const guardarEdicionSub = (i, si, texto) => {
        if (!texto.trim()) return;

        setTareas(
            tareas.map((t, index) =>
                index === i
                    ? {
                        ...t,
                        subtareas: t.subtareas.map((st, s) =>
                            s === si ? texto : st
                        )
                    }
                    : t
            )
        );

        setEditIndex(null);
        setEditSubIndex(null);
    };

    /* =======================
       RENDER
    ======================= */
    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Tareas con Subtareas</h1>

            <div className="flex gap-2 mb-4">
                <input
                    className="border p-2 flex-1"
                    value={inputTarea}
                    onChange={e => setInputTarea(e.target.value)}
                    placeholder="Nueva tarea..."
                />
                <button onClick={agregarTarea}>Agregar</button>
            </div>

            <ul>
                {tareas.map((t, i) => (
                    <li key={i} className="mb-4">
                        {editIndex === i && editSubIndex === null ? (
                            <>
                                <input
                                    className="border p-1"
                                    defaultValue={t.texto}
                                    onBlur={e => guardarEdicion(i, e.target.value)}
                                />
                            </>
                        ) : (
                            <>
                                <strong>{t.texto}</strong>
                                <button onClick={() => setEditIndex(i)}>Editar</button>
                                <button onClick={() => eliminarTarea(i)}>Eliminar</button>
                            </>
                        )}

                        <ul className="ml-4">
                            {t.subtareas.map((st, si) => (
                                <li key={si}>
                                    {editIndex === i && editSubIndex === si ? (
                                        <input
                                            defaultValue={st}
                                            onBlur={e =>
                                                guardarEdicionSub(i, si, e.target.value)
                                            }
                                        />
                                    ) : (
                                        <>
                                            {st}
                                            <button onClick={() => {
                                                setEditIndex(i);
                                                setEditSubIndex(si);
                                            }}>
                                                Editar
                                            </button>
                                            <button onClick={() => eliminarSubtarea(i, si)}>
                                                Eliminar
                                            </button>
                                        </>
                                    )}
                                </li>
                            ))}
                        </ul>

                        <input
                            className="border p-1 mt-2"
                            value={subInputs[i] || ""}
                            onChange={e =>
                                setSubInputs({ ...subInputs, [i]: e.target.value })
                            }
                            placeholder="Agregar subtarea..."
                        />
                        <button onClick={() => agregarSubtarea(i)}>+</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
