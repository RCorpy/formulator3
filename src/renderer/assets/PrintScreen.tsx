import React from 'react'

export default function PrintScreen() {

    const getFecha = () => {
        let today = new Date();
        return `${today.getDate()}-${
          today.getMonth() + 1
        }-${today.getFullYear()}`;
    }

    const getRegistro = () => {
        return "registro 23001"
    }

    const getProduct = () => {
        return "Test Product"
    }

    const getCantidad = () => {
        return "5"
    }

  return (
    <div className='showprintable'>
        <div className='printheader'>
            <div className='printregistro'>{getRegistro()}</div>
            <div className='printfecha'>{getFecha()}</div>
        </div>
        <div className='printheaderdos'>
            <div className='printproduct'>{getProduct()}</div>
            <div className='printcantidad'>{getCantidad()}</div>
        </div>
        <div className='printtable'>
            <div className='printtableheader'>
                <div className='printref'>Referencia?</div>
                <div className='printnombre'>Nombre</div>
                <div className='printheadercantidad'>Cantidad</div>
            </div>
            
            <div className='printtablerow'>
                <div className='printref'>0</div>
                <div className='printnombre'>Metoxi</div>
                <div className='printheadercantidad'>50</div>
            </div>
            <div className='printtablerow'>
                <div className='printref'>0</div>
                <div className='printnombre'>Metoxi</div>
                <div className='printheadercantidad'>50</div>
            </div>
            <div className='printtablerow'>
                <div className='printref'>0</div>
                <div className='printnombre'>Metoxi</div>
                <div className='printheadercantidad'>50</div>
            </div>
        </div>
        <div className='printfooter'>
            FOOTER
        </div>
    </div>
  )
}
