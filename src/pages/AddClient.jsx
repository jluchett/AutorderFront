// eslint-disable-next-line no-unused-vars
import React from 'react'
import HeaderBar from '../components/HeaderBar';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const AddClient = () => {
  return (
    <>
      <header>
        <HeaderBar />
      </header>
      <main>
        <section className="info-user">
          <div className="encabezado">
            <div className="user-add">
              <i className="fa-solid fa-user-plus"></i>
            </div>
            <h2>Agregar Cliente</h2>
          </div>
          <div className="form-add">
            <form>
              <div className="input-container">
                <label htmlFor="id" className="label-float">
                  Número identificación
                </label>
                <input
                  type="text"
                  placeholder=" "
                  required
                  className="input-float"
                  id="id"
                  value={""}
                  onChange={(e) => {
                   console.log(e)
                  }}
                />
              </div>
              
              <div>
                <button className="add-button" onClick={"handledSubmit"}>
                  Guardar
                </button>
              </div>
            </form>
          </div>
          <nav className="enlaces">
            <Link className="regresar-button" to={"/"}>
              Regresar a Home
            </Link>
            <span className="separador"></span>
            <Link className="regresar-button" to={"/clients"}>
              Regresar a clientes
            </Link>
          </nav>
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  
  )
}

export default AddClient