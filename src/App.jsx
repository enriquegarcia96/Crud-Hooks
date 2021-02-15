import React from 'react';
import shortid from 'shortid';

function App() {

  const [tarea, SetTarea] = React.useState('');

  //para agregar a la lista de tarea
  const [ tareas, setTareas ] = React.useState([]);

  const  agregarTarea = (e) =>{
    e.preventDefault();
    
    if (!tarea.trim()) {
      console.log('Elemento Vacio');
      return;
    }
    console.log(tarea);

    setTareas([
      ...tareas, 

      //shortid para generar ID Aleatorios
      {id: shortid.generate(), nombreTarea:tarea}
    ]);

    // limpia el formulario
    SetTarea('');
  }



  return (
    <div className="container mt-5">
      <h1 className="text-center">CRUD Simple - Enrique García</h1>      
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
          <ul className="list-group">
            <li className="list-group-item">
              <span className="lead">Nombre de la Tarea</span>
              <button className="btn btn-danger btn-sm float-right mx-2">ELiminar</button>
              <button className="btn btn-warning btn-sm float-right">Editar</button>
            </li>
          </ul>
        </div>
        <div className="col-4">
          <h4 className="text-center">Formulario</h4>
          <form onSubmit={agregarTarea}>
            <input 
              type="text" 
              className="form-control mb-2"
              placeholder="Ingrese Tarea"
              onChange={ e => SetTarea(e.target.value)}
              value={tarea}
            />
            <button className="btn btn-dark btn-block" type="submit">Agregar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
