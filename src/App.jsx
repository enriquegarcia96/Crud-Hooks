import React from 'react';
import shortid from 'shortid';

function App() {

  const [tarea, SetTarea] = React.useState('');
  //para agregar a la lista de tarea
  const [tareas, setTareas] = React.useState([]);
  const [modoEdicion, setModoEdicion] = React.useState(false);
  const [id, setId ] = React.useState('');
  const [ error, setError ] = React.useState(null);

  const agregarTarea = (e) => {
    e.preventDefault();

    if (!tarea.trim()) {
      console.log('Elemento Vacio');
      setError('Escriba algo por favor...')
      return;
    }
    console.log(tarea);

    setTareas([
      ...tareas,

      //shortid para generar ID Aleatorios
      { id: shortid.generate(), nombreTarea: tarea }
    ]);

    // limpia el formulario
    SetTarea('');
    setError(null)
  }


  const eliminarTarea = id => {
    const arrayFiltrado = tareas.filter(item => item.id !== id);
    setTareas(arrayFiltrado);
  }

  const editar = item => {
    setModoEdicion(true);
    SetTarea(item.nombreTarea);
    setId(item.id);
  }

  const editarTarea = e => {
    e.preventDefault();

    if (!tarea.trim()) {
      console.log('Elemento Vacio')
      return;
    }

    const arrayEditado = tareas.map( item => item.id === id ? { id, nombreTarea:tarea} : item );

    // guardo la tarea editada
    setTareas(arrayEditado);
    
    setModoEdicion(false);
    SetTarea('');
    setId('');
    setError(null)
  }


  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD Simple - Enrique García</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className="list-group">
            {
              tareas.length === 0  ? (
                  <li className="list-group-item">No hay Tareas</li>
              ) : (
                tareas.map(item => (
                  <li className="list-group-item" key={item.id}>
                    <span className="lead">{item.nombreTarea}</span>
  
                    <button
                      className="btn btn-danger btn-sm float-right mx-2"
                      onClick={() => eliminarTarea(item.id)}
                    >
                      ELiminar
                        </button
                    >
  
                    <button
                      className="btn btn-warning btn-sm float-right"
                      onClick={() => editar(item)}
                    >
                      Editar
                        </button
                    >
                  </li>
                ))
              )
            }
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {
              modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'
            }
          </h4>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {
              error ? <span className="text-danger">{error}</span> : null
            }

            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese Tarea"
              onChange={e => SetTarea(e.target.value)}
              value={tarea}
            />

            {
              modoEdicion ? (
                <button className="btn btn-warning btn-block" type="submit">Editar</button>
              ) : (<button className="btn btn-dark btn-block" type="submit">Agregar</button>
                )
            }
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
