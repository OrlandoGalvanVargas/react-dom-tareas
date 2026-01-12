export default function SubtareaItem({ texto, isEditing, onEditar, onEliminar, onGuardar}) {
    return (
        <li>
            {isEditing ? (
                <input
                defaultValue={texto}
                onBlur={e => onGuardar(e.target.value)}
                />
            ) : (
                <>
                {texto}
                <button onClick={onEditar}>Editar</button>
                <button onClick={onEliminar}>Eliminar</button>
                </>
            )}
        </li>
    );   
}