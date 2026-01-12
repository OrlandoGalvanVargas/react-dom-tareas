import { useState } from "react";
import { useTareasSubtareas } from "./useTareasSubtareas";

export default function ListaTareasSubtareas() {

    const {
        tareas,
        editIndex,
        editSubIndex,
        setEditIndex,
        setEditSubIndex,
        agregarTarea,
        eliminarTarea,
        agregarSubtarea,
        eliminarSubtarea,
        editarTarea,
        editarSubtarea
    } = useTareasSubtareas();

    /* =======================
       STATE
    ======================= */
    const [inputTarea, setInputTarea] = useState("");
    const [subInputs, setSubInputs] = useState({});

    const totalTareas = tareas.length;
    const totalSubTareas = tareas.reduce((acc, t) => t.subtareas.length + acc, 0);
    const tareasConSub = tareas.filter((t) => t.subtareas.length > 0 ).length;
    const tareasVacias = totalTareas - tareasConSub;


    /* =======================
       RENDER
    ======================= */
    return (
        <div className="p-4 max-w-xl mx-auto">
            <h1 className="text-xl font-bold mb-4">Tareas con Subtareas</h1>

            <div>
                <h2>Estadisticas</h2>
                <ul>
                    <li id="1">Total de tareas: {totalTareas}</li>
                    <li id="2">Total de subtareas: {totalSubTareas}</li>
                    <li id="3">Total de tareas con sub: {tareasConSub}</li>
                    <li id="4">Total de tareas vacias: {tareasVacias}</li>
                </ul>
            </div>

            <div className="flex gap-2 mb-4">
                <input
                    className="border p-2 flex-1"
                    value={inputTarea}
                    onChange={e => setInputTarea(e.target.value)}
                    placeholder="Nueva tarea..."
                />
                <button onClick={() => agregarTarea(inputTarea)}>Agregar</button>
            </div>

            <ul>
                {tareas.map((t, i) => (
                    <li key={i} className="mb-4">
                        {editIndex === i && editSubIndex === null ? (
                            <>
                                <input
                                    className="border p-1"
                                    defaultValue={t.texto}
                                    onBlur={e => editarTarea(i, e.target.value)}
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
                                                editarSubtarea(i, si, e.target.value)
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
                        <button onClick={() => agregarSubtarea(i, subInputs[i])}>+</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
