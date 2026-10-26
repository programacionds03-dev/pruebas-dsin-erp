/* ============================================================================
   Prueba de punta a punta · Un día completo de operación · Administrador
   Una sola prueba en orden: apertura, compra, precios, promocional, ventas,
   despacho, ruta, cobros, tesorería y cierre del día. Datos mínimos:
   2 productos, 1 promocional, 2 ventas, 1 abono y 1 pago.
   Marcado: «rótulo de pantalla», `dato`, **negrita**, [[ruta|enlace al sistema]].
   ============================================================================ */
window.AREA = {
  id: 'flujo-dia',
  nombre: 'Flujo de un día (Administrador)',
  corto: 'Antes de empezar',
  titulo: 'Un día completo de operación, de la apertura al cierre',
  sub: 'Hazlo en orden y en un mismo día: cada paso usa lo que dejó el anterior.',
  color: '#17202e',
  version: '2026-10-26',
  intro: [
    {
      tipo: 'aviso', tono: 'ok', titulo: 'Cómo se hace',
      html: 'Entra con un usuario **Administrador** y sigue los pasos **en orden, el mismo día**: la compra trae el producto que después se vende, la venta 2 es la que va en la ruta y la que se cobra, y el cierre cuadra todo lo anterior. En cada paso marca el resultado y anota en el comentario el número del documento que se generó. Al terminar pulsa «Descargar reporte».'
    },
    {
      tipo: 'aviso', tono: 'atencion', titulo: 'Datos de prueba que necesitas',
      html: '<b>Producto A</b> sin series y <b>Producto B</b> con series (pueden estar en cero). Un <b>proveedor</b>. <b>Cliente 1</b> consumidor final y <b>Cliente 2</b> contribuyente (NIT y NRC) con crédito habilitado y lista de precios. Un <b>promocional</b> activo. Un <b>lugar de ruta</b>, un <b>rutero</b> y un <b>vehículo</b>. Una <b>cuenta bancaria</b> activa. El paso DAT-01 los revisa.'
    },
    {
      tipo: 'aviso', tono: 'peligro', titulo: 'Montos que se usan en toda la prueba',
      html: 'Compra: A 10 u a $6.00 y B 2 u a $50.00, al crédito (total $180.80). Precios: A $11.30 con IVA y B $113.00 con IVA. Venta 1: A ×2 de contado ($22.60) con el promocional. Venta 2: B ×1 en crédito fiscal al crédito, con ruta. Abono del cliente: $50.00. Pago al proveedor: $80.00. Gasto de caja: $5.00. Remesa a banco: $20.00. Las ventas se transmiten al ambiente de pruebas de Hacienda.'
    }
  ],
  pantallas: [
    /* ============================================================== 0. DATOS */
    {
      id: 'datos', codigo: 'DAT', titulo: '0 · Antes de empezar', corto: '0 · Datos de prueba', ruta: 'Inventario → «Productos / Servicios» · Generales → «Clientes»', url: 'productos', color: '#475569',
      pruebas: [
        {
          id: 'DAT-01', titulo: 'Revisar que existen los datos de prueba',
          pasos: [
            'Confirma que existen el Producto A (sin series) y el Producto B (marcado «Maneja números de serie»), el proveedor, el Cliente 1 y el Cliente 2 (con NIT, NRC y crédito habilitado), el promocional, el lugar de ruta, el rutero, el vehículo y la cuenta bancaria.',
            'Anota en el comentario la existencia actual de A y B (aparece en su ficha).'
          ],
          espera: [
            'Todo existe y está activo. Si falta algo, créalo antes de seguir.'
          ]
        }
      ]
    },

    /* ============================================================== 1. APERTURA */
    {
      id: 'apertura', codigo: 'APE', titulo: '1 · Apertura del día', corto: '1 · Apertura', ruta: 'Cuentas por cobrar → «Corte de caja» · Tesoreria → «Caja Fisica Central»', url: 'caja', color: '#1c58ad',
      pruebas: [
        {
          id: 'APE-01', titulo: 'Abrir el corte de caja',
          pasos: [
            'En «Corte de caja» pulsa «Abrir corte», deja la «Fecha» de hoy, escribe «Fondo inicial» = 100 y pulsa «Abrir».'
          ],
          espera: [
            '«Corte de caja abierto.» y la insignia pasa a «Abierto».'
          ]
        },
        {
          id: 'APE-02', titulo: 'Abrir la caja física',
          pasos: [
            'En «Caja Fisica Central», tarjeta «Jornada», deja la «Fecha» de hoy, escribe «Monto inicial» = 100 y pulsa «Abrir caja».'
          ],
          espera: [
            '«Caja Fisica Central abierta.» y la jornada queda «Abierta».'
          ],
          nota: 'Ábrela antes de vender: la venta de contado solo pasa sola a la caja física si la jornada está abierta.'
        }
      ]
    },

    /* ============================================================== 2. COMPRA */
    {
      id: 'compra', codigo: 'COM', titulo: '2 · Compra al proveedor', corto: '2 · Compra', ruta: 'Inventario → «Compras / NC»', url: 'compras', color: '#0c6a66',
      pruebas: [
        {
          id: 'COM-01', titulo: 'Registrar la compra al crédito',
          pasos: [
            'Pulsa «Nueva compra»: llena «Proveedor», «Tipo de documento», «Numero de control», «Fecha», una «Forma de pago» al crédito, «Sucursal» y «Bodega de ingreso».',
            'Agrega A con «Cantidad» 10 y «Precio» 6.00, y B con «Cantidad» 2, «Precio» 50.00 y sus 2 series en «Una serie por linea». Deja «Procesar al guardar» marcada y pulsa «Guardar Compra».'
          ],
          espera: [
            'Mensaje de compra registrada y procesada, insignia «Procesada» y «Total a pagar» $180.80.',
            'La compra aparece en «Cuentas por pagar» con su vencimiento.'
          ],
          nota: 'Anota el número de la compra.'
        },
        {
          id: 'COM-02', titulo: 'Completar la compra y ver la entrada en el Kardex',
          pasos: [
            'En la ficha de la compra pulsa «Completar» y acepta.',
            'En «Kardex» consulta A y luego B.'
          ],
          espera: [
            '«Compra completada. Ya no se permiten nuevas lineas ni cambios de detalle.» y la insignia «Completada».',
            'El Kardex muestra la entrada: A sube 10 y B sube 2.'
          ]
        }
      ]
    },

    /* ============================================================== 3. PRECIOS */
    {
      id: 'precios', codigo: 'PRC', titulo: '3 · Cambio de precio', corto: '3 · Precios', ruta: 'Inventario → «Productos / Servicios» → ficha del producto', url: 'productos', color: '#be185d',
      pruebas: [
        {
          id: 'PRC-01', titulo: 'Poner el precio de venta de A y B',
          pasos: [
            'En la ficha de A, tarjeta «Precios por lista de precios», escribe «c/IVA» = 11.30 en la lista del Cliente 1 y del Cliente 2 y pulsa «Guardar precios». Haz lo mismo con B, «c/IVA» = 113.00.'
          ],
          espera: [
            'Aviso de precios actualizados correctamente y el «s/IVA» calculado solo: 10.00 y 100.00.',
            'Si el precio queda bajo la utilidad mínima, no deja guardar y dice cuánto subirlo.'
          ]
        },
        {
          id: 'PRC-02', titulo: 'Verificar los cambios automáticos de la compra',
          pasos: [
            'En la ficha de A pulsa «Cambios de precio». Si hay un cambio marcado «Ingreso de compra», pulsa «Verificar».'
          ],
          espera: [
            'El cambio pasa a «Verificado». Si la compra no subió el precio, no aparece ningún cambio automático: anótalo y sigue.'
          ]
        }
      ]
    },

    /* ============================================================== 4. PROMOCIONAL */
    {
      id: 'promocional', codigo: 'PRL', titulo: '4 · Preparar el promocional', corto: '4 · Promocional', ruta: 'Inventario → «Promocionales» → ficha', url: 'promocionales', color: '#c2410c',
      pruebas: [
        {
          id: 'PRL-01', titulo: 'Darle existencia y una regla de entrega',
          pasos: [
            'En la ficha del promocional, tarjeta «Registrar movimiento», elige «Sucursal», «Tipo» = Entrada y «Cantidad» = 5, y pulsa «Registrar movimiento».',
            'En «Reglas de entrega en la facturación» elige «Tipo de regla» = Por producto específico, «Producto que la activa» = A, «Entrega (und.)» = 1, y pulsa «Agregar regla».'
          ],
          espera: [
            '«Movimiento del promocional registrado con su kardex.» y la existencia de tu sucursal sube 5.',
            '«Regla de entrega agregada.».'
          ]
        }
      ]
    },

    /* ============================================================== 5. VENTAS */
    {
      id: 'ventas', codigo: 'VTA', titulo: '5 · Ventas del día', corto: '5 · Ventas', ruta: 'Facturación → «Nueva venta»', url: 'ventas/create', color: '#2563eb',
      pruebas: [
        {
          id: 'VTA-01', titulo: 'Venta 1: factura de contado con promocional',
          pasos: [
            'En «Nueva venta» elige el Cliente 1, «Tipo de documento» factura, «Bodega de descarga» y «Forma de pago» de contado en efectivo. Agrega A con «Cantidad» 2.',
            'Abre «Promocional de regalo», confirma que el promocional quedó marcado y pulsa «Emitir DTE (queda pendiente de transmisión)».'
          ],
          espera: [
            'Total $22.60. Abre el detalle con el aviso de descarga de inventario exitosa, el estado del DTE y la tarjeta «Promocionales entregados».',
            'En «Caja Fisica Central» sube el efectivo por la venta.'
          ],
          nota: 'Anota el número de control de la venta 1.'
        },
        {
          id: 'VTA-02', titulo: 'Venta 2: crédito fiscal al crédito con ruta',
          pasos: [
            'En «Nueva venta» elige el Cliente 2, «Tipo de documento» crédito fiscal y una «Forma de pago» al crédito. Agrega B con «Cantidad» 1.',
            'Elige el lugar de ruta en «Ruta (vinculación de envío)» y su «Costo de envío», y pulsa «Emitir DTE (queda pendiente de transmisión)».'
          ],
          espera: [
            'Se emite el crédito fiscal (B $100.00 + IVA, más el envío) y aparece en «Cuentas por cobrar» como pendiente.',
            'La venta aparece en Rutas → «Documentos pendientes».'
          ],
          nota: 'Anota el número de control de la venta 2: se usa en la ruta y en el cobro.'
        }
      ]
    },

    /* ============================================================== 6. DESPACHO */
    {
      id: 'despacho', codigo: 'DES', titulo: '6 · Despacho de bodega', corto: '6 · Despacho', ruta: 'Facturación → «Despachos»', url: 'despachos', color: '#0d9488',
      pruebas: [
        {
          id: 'DES-01', titulo: 'Despachar las dos ventas',
          pasos: [
            'Busca la venta 1 en «Numero de documento», pulsa «Preparar despacho», asigna la cantidad y pulsa «Guardar despacho».',
            'Haz lo mismo con la venta 2, leyendo la serie de B en «Productos y series entregadas».'
          ],
          espera: [
            '«Despacho registrado correctamente.» en las dos; la serie de B queda «Vendida» en Inventario → «Series».'
          ]
        }
      ]
    },

    /* ============================================================== 7. RUTA */
    {
      id: 'ruta', codigo: 'RUT', titulo: '7 · Entrega por ruta', corto: '7 · Ruta', ruta: 'Rutas → «Hojas de ruta» · «Documentos pendientes»', url: 'rutas', color: '#7c3aed',
      pruebas: [
        {
          id: 'RUT-01', titulo: 'Crear la hoja y asignarle la venta 2',
          pasos: [
            'Pulsa «Nueva hoja de ruta», elige «Lugar de ruta (destino)» = el de la venta 2, «Fecha de ruta» = hoy, el «Rutero» y el «Vehículo», y pulsa «Crear hoja de ruta».',
            'En el detalle marca la venta 2 en los documentos pendientes de asignar y pulsa «Asignar documentos seleccionados».'
          ],
          espera: [
            'La hoja HR-… queda «Programada» con 1 parada «Pendiente», y la venta 2 sale de «Documentos pendientes».'
          ],
          nota: 'Anota el número de la hoja.'
        },
        {
          id: 'RUT-02', titulo: 'Iniciar la ruta y registrar la entrega',
          pasos: [
            'En la hoja pulsa «Iniciar ruta».',
            'En la parada pulsa el botón «Registrar entrega», elige «Resultado» = Entregada, deja sin marcar el cobro y pulsa «Guardar entrega».'
          ],
          espera: [
            'La hoja pasa a «En ruta» y después «Entrega registrada.»: la parada queda «Entregada».'
          ]
        },
        {
          id: 'RUT-03', titulo: 'Entregar la ruta, recibirla en caja y finalizarla',
          pasos: [
            'Pulsa «Entregar ruta». Luego «Recibir en caja», elige el corte de hoy en «Corte de caja» y pulsa «Confirmar recepción».',
            'Pulsa «Finalizar ruta».'
          ],
          espera: [
            'La hoja pasa por «Entregada por el rutero» y «Recibida en caja» («Ruta recibida en caja. Imprima el reporte de recepción como respaldo.»), y termina «Finalizada».'
          ],
          nota: '«Finalizar ruta» pide el permiso de finalizar rutas: si no aparece, anótalo.'
        }
      ]
    },

    /* ============================================================== 8. COBROS Y PAGOS */
    {
      id: 'cobros', codigo: 'COB', titulo: '8 · Cobro al cliente y pago al proveedor', corto: '8 · Cobros y pagos', ruta: 'Cuentas por cobrar → «Cuentas por cobrar» · Cuentas por pagar → «Cuentas por pagar»', url: 'cxc', color: '#b45309',
      pruebas: [
        {
          id: 'COB-01', titulo: 'Abonar a la venta 2',
          pasos: [
            'En «Cuentas por cobrar» ubica la venta 2 y pulsa «Abonar». Escribe «Monto del abono» = 50.00, elige «Forma de pago» en efectivo y pulsa «Registrar abono». No cambies el texto de «Caja».'
          ],
          espera: [
            '«Abono registrado; el saldo de la cuenta fue actualizado.». La cuenta queda «Parcialmente pagado» con el saldo rebajado en $50.00.'
          ]
        },
        {
          id: 'COB-02', titulo: 'Pagar parte de la compra al proveedor',
          pasos: [
            'En «Cuentas por pagar» ubica la compra de COM-01 y pulsa «Abonar». Escribe «Monto del abono» = 80.00, elige «Forma de pago» y pulsa «Registrar abono».'
          ],
          espera: [
            '«Pago registrado; el saldo de la cuenta fue actualizado.». El saldo de la compra queda en $100.80 y el pago aparece en «Corte diario de pagos».'
          ]
        }
      ]
    },

    /* ============================================================== 9. TESORERÍA */
    {
      id: 'tesoreria', codigo: 'TES', titulo: '9 · Gasto y remesa a banco', corto: '9 · Tesorería', ruta: 'Cuentas por cobrar → «Corte de caja» · Tesoreria → «Remesas a banco»', url: 'bancos/remesas', color: '#475569',
      pruebas: [
        {
          id: 'TES-01', titulo: 'Registrar un gasto de caja',
          pasos: [
            'En «Corte de caja», tarjeta «Movimientos», pulsa el botón «Registrar gasto», escribe «Monto» = 5 y «Motivo», y pulsa «Registrar».'
          ],
          espera: [
            '«Gasto de caja registrado.» y suben los «Gastos de caja» del corte.'
          ]
        },
        {
          id: 'TES-02', titulo: 'Remesar efectivo de caja al banco',
          pasos: [
            'En «Remesas a banco» llena «Empresa Caja (de quien es el dinero)», «Cuenta bancaria destino», «Fecha» y «Monto» = 20.00, y pulsa «Registrar remesa».'
          ],
          espera: [
            '«Remesa registrada: el dinero salio de Caja Fisica y entro al banco.». En «Cuentas bancarias» el saldo sube $20.00 y en «Caja Fisica Central» el saldo esperado baja $20.00.'
          ],
          nota: 'Hazla antes de cerrar la caja física: con la caja cerrada no deja remesar.'
        }
      ]
    },

    /* ============================================================== 10. CIERRE */
    {
      id: 'cierre', codigo: 'CIE', titulo: '10 · Cierre del día', corto: '10 · Cierre', ruta: 'Cuentas por cobrar → «Conciliacion caja» · «Corte de caja» · Tesoreria → «Caja Fisica Central»', url: 'cxc/conciliacion-caja', color: '#b0342a',
      pruebas: [
        {
          id: 'CIE-01', titulo: 'Conciliar los cobros con el corte',
          pasos: [
            'En «Conciliacion caja» deja la fecha de hoy y pulsa «Revisar».'
          ],
          espera: [
            'El abono de COB-01 aparece con su corte y «Movimientos sin corte» queda en 0.'
          ]
        },
        {
          id: 'CIE-02', titulo: 'Cerrar el corte de caja con arqueo',
          pasos: [
            'En «Corte de caja» revisa el «Resumen» (venta 1, abono, gasto). Pulsa «Cerrar», escribe el efectivo contado por denominación y pulsa «Cerrar corte».'
          ],
          espera: [
            '«Corte cerrado con arqueo fisico.». El corte queda «Cerrado» y el «Arqueo» dice «Cuadrado» si lo contado es igual al «Efectivo esperado».'
          ],
          nota: 'Anota en el comentario el efectivo esperado y el contado.'
        },
        {
          id: 'CIE-03', titulo: 'Cerrar la caja física',
          pasos: [
            'En «Caja Fisica Central», tarjeta «Jornada», escribe el «Efectivo contado» y pulsa «Cerrar caja».'
          ],
          espera: [
            '«Caja Fisica Central cerrada.» y la jornada queda «Cerrada».'
          ]
        }
      ]
    },

    /* ============================================================== 11. VERIFICACIÓN */
    {
      id: 'verificacion', codigo: 'VER', titulo: '11 · Verificación final', corto: '11 · Verificación', ruta: 'Inventario → «Kardex» · «Cuentas por cobrar» · «Cuentas por pagar»', url: 'kardex', color: '#1b7a43',
      pruebas: [
        {
          id: 'VER-01', titulo: 'Cuadrar el inventario del día',
          pasos: [
            'En «Kardex» consulta A y B, y en la ficha del promocional revisa su existencia.'
          ],
          espera: [
            'A: existencia inicial + 10 − 2. B: existencia inicial + 2 − 1. Promocional: 5 − 1 = 4.'
          ]
        },
        {
          id: 'VER-02', titulo: 'Cuadrar lo que se debe y lo que nos deben',
          pasos: [
            'Revisa el saldo de la venta 2 en «Cuentas por cobrar» y el de la compra en «Cuentas por pagar».'
          ],
          espera: [
            'Venta 2: su total menos $50.00. Compra: $100.80.',
            'Si todo cuadra, el día quedó cerrado de punta a punta.'
          ]
        }
      ]
    }
  ]
};
