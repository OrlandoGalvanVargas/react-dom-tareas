import { useEffect, useState } from "react";

export function useTareasSubtareas() {
    
    /* States */
    const [tareas, setTareas] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editSubIndex, setEditSubIndex] = useState(null);

    /* Effects */
    useEffect(() => {
        const data = localStorage.getItem("tareas-sub");
        if (data) setTareas(JSON.parse(data));
    }, []);

    useEffect(() => {
        localStorage.setItem("tareas-sub", JSON.stringify(tareas));
    }, [tareas]);

    /* Handlers */

    const agregarTarea = (texto)  => {
        if (!texto) return;

        setTareas([...tareas, {texto, subtareas: []}]);
    };

    const eliminarTarea = (i) => {
        setTareas(tareas.filter((_, index) => index != i ));
    }

    const agregarSubtarea = (i, texto) => {
        if (!texto) return;

        setTareas(tareas.map((t, index) => index === i ? {...t, subtareas: [...t.subtareas, texto]} : t ));
    }

    const eliminarSubtarea = (i, si) => {
        setTareas(tareas.map((t, index) => index === i ? {...t, subtareas: t.subtareas.filter((_, s) => s != si )} : t ));
    }

    const editarTarea = (i, texto) => {
        if (!texto) return;

        setTareas(tareas.map((t,index) => index === i ? {...t, texto}: t));
        setEditIndex(null);
    }

    const editarSubtarea = (i, si, texto) => {
        if (!texto) return;

        setTareas(tareas.map((t, index) => index === i ? {...t, subtareas: t.subtareas.map((st, s) => s === si ? texto : st) } : t));
        setEditIndex(null);
        setEditSubIndex(null);
    }

    return {
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
    };
}