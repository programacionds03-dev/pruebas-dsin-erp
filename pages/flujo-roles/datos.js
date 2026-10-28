/* ============================================================================
   Prueba de punta a punta · Un día completo de operación · Por roles
   El mismo día de flujo-dia, pero cada paso lo hace el usuario del área que
   le corresponde (etiqueta «Lo hace: …»). Datos mínimos: 2 productos,
   1 promocional, 2 ventas, 1 abono y 1 pago.
   Marcado: «rótulo de pantalla», `dato`, **negrita**, [[ruta|enlace al sistema]].
   ============================================================================ */
window.AREA = {
  id: 'flujo-roles',
  nombre: 'Flujo de un día por roles',
  corto: 'Antes de empezar',
  titulo: 'Un día completo de operación, cada paso con su rol',
  sub: 'Hazlo en orden y en un mismo día; antes de cada paso entra al sistema con el usuario que indica la etiqueta “Lo hace”.',
  color: '#0f766e',
  version: '2026-10-28',
  intro: [
    {
      tipo: 'aviso', tono: 'ok', titulo: 'Cómo se hace',
      html: 'Cada paso dice arriba a la derecha **qué usuario lo hace** (etiqueta <span class="chip req">Lo hace: …</span>). Deja esta prueba abierta en un navegador y entra al sistema en <b>otro navegador o en una ventana privada</b>: así cambias de usuario sin perder lo que marcaste aquí. Sigue los pasos en orden y el mismo día, marca el resultado y anota el número de cada documento. Si a un usuario no le aparece el botón que indica el paso, marca <b>Falló</b>, anota “no le aparece a [rol]” y haz ese paso con el Administrador para poder seguir.'
    },
    {
      tipo: 'tabla', titulo: 'Usuarios que necesitas y qué hace cada uno', cabecera: ['Rol', 'Qué hace en el día'],
      filas: [['**Caja (CXC)**','Abre el corte y la caja física, recibe la ruta, cobra el abono, registra el gasto, confirma el cobro y concilia.'],
        ['**Almacén**','Registra y completa la compra, da existencia al promocional y despacha las ventas.'],
        ['**PM**','Pone los precios y la regla del promocional.'],
        ['**Ventas**','Emite las dos ventas.'],
        ['**Ruta**','Arma la hoja de ruta.'],
        ['**Rutero**','Inicia la ruta, entrega y la regresa a caja (su usuario debe estar vinculado al rutero).'],
        ['**CXP**','Paga al proveedor y remesa el efectivo al banco.'],
        ['**Supervisor CXC**','Cierra el corte y la caja física.'],
        ['**Administrador**','Revisa los datos al inicio, finaliza la hoja de ruta y verifica el cierre.']]
    },
    {
      tipo: 'aviso', tono: 'atencion', titulo: 'Datos y montos de toda la prueba',
      html: '<b>Producto A</b> sin series y <b>Producto B</b> con series; un <b>proveedor</b>; <b>Cliente 1</b> consumidor final y <b>Cliente 2</b> con NIT, NRC y crédito habilitado; un <b>promocional</b>; un <b>lugar de ruta</b>, un <b>rutero</b> y un <b>vehículo</b>; una <b>cuenta bancaria</b>. Compra: A 10 u a $6.00 y B 2 u a $50.00 al crédito ($180.80). Precios: A $11.30 y B $113.00 con IVA. Venta 1: A ×2 de contado ($22.60) con promocional. Venta 2: B ×1 en crédito fiscal al crédito, con ruta. Abono: $50.00. Pago al proveedor: $80.00. Gasto: $5.00. Remesa a banco: $20.00. Las ventas van al ambiente de pruebas de Hacienda.'
    }
  ],
  pantallas: [
    /* ============================================================== 0. DATOS */
    {
      id: 'datos', codigo: 'DAT', titulo: '0 · Antes de empezar', corto: '0 · Datos y usuarios', ruta: 'Inventario → «Productos / Servicios» · Rutas → «Ruteros»', url: 'productos', color: '#475569',
      pruebas: [
        {
          id: 'DAT-01', titulo: 'Revisar datos de prueba y usuarios', requiere: 'Administrador',
          pasos: [
            'Confirma que existen los productos A y B, el proveedor, los clientes 1 y 2, el promocional, el lugar de ruta, el vehículo y la cuenta bancaria, y un usuario activo por cada rol de la tabla.',
            'En Rutas → «Ruteros» confirma que el rutero tiene elegido el usuario del Rutero en «Usuario del sistema». Anota la existencia inicial de A y B.'
          ],
          espera: [
            'Todo existe y cada usuario entra al sistema con su rol.'
          ]
        }
      ]
    },

    /* ============================================================== 1. APERTURA */
    {
      id: 'apertura', codigo: 'APE', titulo: '1 · Apertura del día', corto: '1 · Apertura', ruta: 'Cuentas por cobrar → «Corte de caja» · Tesoreria → «Caja Fisica Central»', url: 'caja', color: '#1c58ad',
      pruebas: [
        {
          id: 'APE-01', titulo: 'Abrir el corte de caja', requiere: 'Caja (CXC)',
          pasos: [
            'En «Corte de caja» pulsa «Abrir corte», deja la «Fecha» de hoy, escribe «Fondo inicial» = 100 y pulsa «Abrir».'
          ],
          espera: [
            '«Corte de caja abierto.» y la insignia pasa a «Abierto».'
          ]
        },
        {
          id: 'APE-02', titulo: 'Abrir la caja física', requiere: 'Caja (CXC)',
          pasos: [
            'En «Caja Fisica Central», tarjeta «Jornada», deja la «Fecha» de hoy, escribe «Monto inicial» = 100 y pulsa «Abrir caja».'
          ],
          espera: [
            '«Caja Fisica Central abierta.» y la jornada queda «Abierta».'
          ]
        }
      ]
    },

    /* ============================================================== 2. COMPRA */
    {
      id: 'compra', codigo: 'COM', titulo: '2 · Compra al proveedor', corto: '2 · Compra', ruta: 'Inventario → «Compras / NC»', url: 'compras', color: '#0c6a66',
      pruebas: [
        {
          id: 'COM-01', titulo: 'Registrar la compra al crédito', requiere: 'Almacén',
          pasos: [
            'Pulsa «Nueva compra»: llena «Proveedor», «Tipo de documento», «Numero de control», «Fecha», una «Forma de pago» al crédito, «Sucursal» y «Bodega de ingreso».',
            'Agrega A con «Cantidad» 10 y «Precio» 6.00, y B con «Cantidad» 2, «Precio» 50.00 y sus 2 series en «Una serie por linea». Deja «Procesar al guardar» marcada y pulsa «Guardar Compra».'
          ],
          espera: [
            'Compra registrada y procesada, insignia «Procesada» y «Total a pagar» $180.80.',
            'La compra aparece en «Cuentas por pagar» con su vencimiento.'
          ],
          nota: 'Anota el número de la compra.'
        },
        {
          id: 'COM-02', titulo: 'Completar la compra y ver la entrada en el Kardex', requiere: 'Almacén',
          pasos: [
            'En la ficha de la compra pulsa «Completar» y acepta. Luego consulta A y B en «Kardex».'
          ],
          espera: [
            '«Compra completada. Ya no se permiten nuevas lineas ni cambios de detalle.» e insignia «Completada».',
            'El Kardex muestra la entrada: A sube 10 y B sube 2.'
          ]
        }
      ]
    },

    /* ============================================================== 3. PRECIOS Y PROMOCIONAL */
    {
      id: 'precios', codigo: 'PRC', titulo: '3 · Precios y promocional', corto: '3 · Precios y promocional', ruta: 'Inventario → «Productos / Servicios» · «Promocionales»', url: 'productos', color: '#be185d',
      pruebas: [
        {
          id: 'PRC-01', titulo: 'Poner el precio de venta de A y B', requiere: 'PM',
          pasos: [
            'En la ficha de A, tarjeta «Precios por lista de precios», escribe «c/IVA» = 11.30 en la lista de cada cliente y pulsa «Guardar precios». Haz lo mismo con B, «c/IVA» = 113.00.',
            'Si en «Cambios de precio» hay un cambio marcado «Ingreso de compra», pulsa «Verificar».'
          ],
          espera: [
            'Aviso de precios actualizados correctamente, con «s/IVA» 10.00 y 100.00. Si queda bajo la utilidad mínima, no deja guardar y dice cuánto subirlo.'
          ]
        },
        {
          id: 'PRC-02', titulo: 'Dar existencia al promocional', requiere: 'Almacén',
          pasos: [
            'En la ficha del promocional, tarjeta «Registrar movimiento», elige «Sucursal», «Tipo» = Entrada y «Cantidad» = 5, y pulsa «Registrar movimiento».'
          ],
          espera: [
            '«Movimiento del promocional registrado con su kardex.» y la existencia de la sucursal sube 5.'
          ]
        },
        {
          id: 'PRC-03', titulo: 'Definir cuándo se regala el promocional', requiere: 'PM',
          pasos: [
            'En «Reglas de entrega en la facturación» elige «Tipo de regla» = Por producto específico, «Producto que la activa» = A, «Entrega (und.)» = 1, y pulsa «Agregar regla».'
          ],
          espera: [
            '«Regla de entrega agregada.».'
          ]
        }
      ]
    },

    /* ============================================================== 4. VENTAS */
    {
      id: 'ventas', codigo: 'VTA', titulo: '4 · Ventas del día', corto: '4 · Ventas', ruta: 'Facturación → «Nueva venta»', url: 'ventas/create', color: '#2563eb',
      pruebas: [
        {
          id: 'VTA-01', titulo: 'Venta 1: factura de contado con promocional', requiere: 'Ventas',
          pasos: [
            'En «Nueva venta» elige el Cliente 1, factura, «Bodega de descarga» y «Forma de pago» de contado en efectivo. Agrega A con «Cantidad» 2.',
            'Abre «Promocional de regalo», confirma que el promocional quedó marcado y pulsa «Emitir DTE (queda pendiente de transmisión)».'
          ],
          espera: [
            'Total $22.60. El detalle muestra el estado del DTE y «Promocionales entregados».',
            'La venta entra sola a «Caja Fisica Central».'
          ],
          nota: 'Anota el número de control de la venta 1.'
        },
        {
          id: 'VTA-02', titulo: 'Venta 2: crédito fiscal al crédito con ruta', requiere: 'Ventas',
          pasos: [
            'En «Nueva venta» elige el Cliente 2, crédito fiscal y una «Forma de pago» al crédito. Agrega B con «Cantidad» 1.',
            'Elige el lugar en «Ruta (vinculación de envío)» y su «Costo de envío», y pulsa «Emitir DTE (queda pendiente de transmisión)».'
          ],
          espera: [
            'Se emite el crédito fiscal y aparece en «Cuentas por cobrar» y en Rutas → «Documentos pendientes».'
          ],
          nota: 'Anota el número de control de la venta 2.'
        }
      ]
    },

    /* ============================================================== 5. DESPACHO */
    {
      id: 'despacho', codigo: 'DES', titulo: '5 · Despacho de bodega', corto: '5 · Despacho', ruta: 'Facturación → «Despachos»', url: 'despachos', color: '#0d9488',
      pruebas: [
        {
          id: 'DES-01', titulo: 'Despachar las dos ventas', requiere: 'Almacén',
          pasos: [
            'Busca la venta 1 en «Numero de documento», pulsa «Preparar despacho» y «Guardar despacho».',
            'Haz lo mismo con la venta 2, leyendo la serie de B en «Productos y series entregadas».'
          ],
          espera: [
            '«Despacho registrado correctamente.» en las dos; la serie de B queda «Vendida» en Inventario → «Series».'
          ]
        }
      ]
    },

    /* ============================================================== 6. RUTA */
    {
      id: 'ruta', codigo: 'RUT', titulo: '6 · Entrega por ruta', corto: '6 · Ruta', ruta: 'Rutas → «Hojas de ruta» · «Documentos pendientes» · «Entrega de ruta»', url: 'rutas', color: '#7c3aed',
      pruebas: [
        {
          id: 'RUT-01', titulo: 'Crear la hoja de ruta y asignarle la venta 2', requiere: 'Ruta',
          pasos: [
            'Pulsa «Nueva hoja de ruta», elige «Lugar de ruta (destino)» = el de la venta 2, «Fecha de ruta» = hoy, el «Rutero» y el «Vehículo», y pulsa «Crear hoja de ruta».',
            'En «Documentos pendientes» marca la venta 2, elige la hoja en «Buscar la hoja de ruta por número, lugar, fecha o rutero...» y pulsa «Asignar a la hoja de ruta».'
          ],
          espera: [
            'La hoja HR-… queda «Programada» con 1 parada «Pendiente», y la venta 2 sale de «Documentos pendientes».'
          ],
          nota: 'Anota el número de la hoja.'
        },
        {
          id: 'RUT-02', titulo: 'Iniciar la ruta y entregar', requiere: 'Rutero',
          pasos: [
            'En «Entrega de ruta» pulsa «Iniciar ruta». En la parada pulsa «Llegada» al llegar y luego «Registrar Entrega» con «Resultado» = Entregada, sin cobro.'
          ],
          espera: [
            '«Ruta iniciada. Registre cada entrega conforme la realice.» y después «Entrega registrada correctamente.».'
          ]
        },
        {
          id: 'RUT-03', titulo: 'Regresar la ruta a caja', requiere: 'Rutero',
          pasos: [
            'Pulsa «Finalizar recorrido» y después «Entregar ruta a caja».'
          ],
          espera: [
            '«Ruta entregada. Preséntela en caja para su recepción.»; en «Hojas de ruta» la hoja queda «Entregada por el rutero».'
          ]
        },
        {
          id: 'RUT-04', titulo: 'Recibir la ruta en caja', requiere: 'Caja (CXC)',
          pasos: [
            'En «Hojas de ruta» abre la hoja, pulsa «Recibir en caja», elige el corte de hoy en «Corte de caja» y pulsa «Confirmar recepción».'
          ],
          espera: [
            '«Ruta recibida en caja. Imprima el reporte de recepción como respaldo.» y la hoja queda «Recibida en caja».'
          ]
        },
        {
          id: 'RUT-05', titulo: 'Cerrar la hoja de ruta', requiere: 'Administrador',
          pasos: [
            'En la hoja pulsa «Finalizar ruta».'
          ],
          espera: [
            'La hoja queda «Finalizada».'
          ]
        }
      ]
    },

    /* ============================================================== 7. COBROS Y PAGOS */
    {
      id: 'cobros', codigo: 'COB', titulo: '7 · Cobro al cliente y pago al proveedor', corto: '7 · Cobros y pagos', ruta: 'Cuentas por cobrar → «Cuentas por cobrar» · Cuentas por pagar → «Cuentas por pagar»', url: 'cxc', color: '#b45309',
      pruebas: [
        {
          id: 'COB-01', titulo: 'Abonar a la venta 2', requiere: 'Caja (CXC)',
          pasos: [
            'En «Cuentas por cobrar» ubica la venta 2 y pulsa «Abonar». Escribe «Monto del abono» = 50.00, elige «Forma de pago» en efectivo y pulsa «Registrar abono». No cambies el texto de «Caja».'
          ],
          espera: [
            '«Abono registrado; el saldo de la cuenta fue actualizado.» y la cuenta queda «Parcialmente pagado».'
          ]
        },
        {
          id: 'COB-02', titulo: 'Pagar parte de la compra al proveedor', requiere: 'CXP',
          pasos: [
            'En «Cuentas por pagar» ubica la compra y pulsa «Abonar». Escribe «Monto del abono» = 80.00, elige «Forma de pago» y pulsa «Registrar abono».'
          ],
          espera: [
            '«Pago registrado; el saldo de la cuenta fue actualizado.»; el saldo queda en $100.80 y el pago aparece en «Corte diario de pagos».'
          ]
        }
      ]
    },

    /* ============================================================== 8. CAJA Y TESORERÍA */
    {
      id: 'tesoreria', codigo: 'TES', titulo: '8 · Caja y tesorería', corto: '8 · Caja y tesorería', ruta: 'Cuentas por cobrar → «Corte de caja» · Tesoreria → «Remesas a banco»', url: 'caja', color: '#475569',
      pruebas: [
        {
          id: 'TES-01', titulo: 'Registrar un gasto de caja', requiere: 'Caja (CXC)',
          pasos: [
            'En «Corte de caja», tarjeta «Movimientos», pulsa el botón «Registrar gasto», escribe «Monto» = 5 y «Motivo», y pulsa «Registrar».'
          ],
          espera: [
            '«Gasto de caja registrado.» y suben los «Gastos de caja» del corte.'
          ]
        },
        {
          id: 'TES-02', titulo: 'Confirmar el cobro de la venta 1', requiere: 'Caja (CXC)',
          pasos: [
            'En «Corte de caja» pulsa «Confirmar cobros», marca la venta 1, pulsa «Confirmar seleccionados», elige «Cobrado» con la forma de pago en efectivo y confirma.'
          ],
          espera: [
            'La venta 1 queda confirmada como cobrada. Ya confirmada, solo la cambia quien tiene el permiso de modificar confirmaciones, escribiendo el motivo.'
          ]
        },
        {
          id: 'TES-03', titulo: 'Remesar efectivo al banco', requiere: 'CXP',
          pasos: [
            'En «Remesas a banco» llena «Empresa Caja (de quien es el dinero)», «Cuenta bancaria destino», «Fecha» y «Monto» = 20.00, y pulsa «Registrar remesa».'
          ],
          espera: [
            '«Remesa registrada: el dinero salio de Caja Fisica y entro al banco.». La cuenta bancaria sube $20.00 y la caja física baja $20.00.'
          ],
          nota: 'Hazla antes de cerrar la caja física.'
        }
      ]
    },

    /* ============================================================== 9. CIERRE */
    {
      id: 'cierre', codigo: 'CIE', titulo: '9 · Cierre del día', corto: '9 · Cierre', ruta: 'Cuentas por cobrar → «Conciliacion caja» · «Corte de caja» · Tesoreria → «Caja Fisica Central»', url: 'cxc/conciliacion-caja', color: '#b0342a',
      pruebas: [
        {
          id: 'CIE-01', titulo: 'Conciliar los cobros con el corte', requiere: 'Caja (CXC)',
          pasos: [
            'En «Conciliacion caja» deja la fecha de hoy y pulsa «Revisar».'
          ],
          espera: [
            'El abono de COB-01 aparece con su corte y «Movimientos sin corte» queda en 0.'
          ]
        },
        {
          id: 'CIE-02', titulo: 'Cerrar el corte de caja con arqueo', requiere: 'Supervisor CXC',
          pasos: [
            'En «Corte de caja» revisa el «Resumen». Pulsa «Cerrar», escribe el efectivo contado por denominación y pulsa «Cerrar corte».'
          ],
          espera: [
            '«Corte cerrado con arqueo fisico.»; el corte queda «Cerrado» y el arqueo «Cuadrado» si lo contado es igual al «Efectivo esperado».'
          ],
          nota: 'Anota el efectivo esperado y el contado.'
        },
        {
          id: 'CIE-03', titulo: 'Cerrar la caja física', requiere: 'Supervisor CXC',
          pasos: [
            'En «Caja Fisica Central», tarjeta «Jornada», escribe el «Efectivo contado» y pulsa «Cerrar caja».'
          ],
          espera: [
            '«Caja Fisica Central cerrada.» y la jornada queda «Cerrada».'
          ]
        }
      ]
    },

    /* ============================================================== 10. VERIFICACIÓN */
    {
      id: 'verificacion', codigo: 'VER', titulo: '10 · Verificación final', corto: '10 · Verificación', ruta: 'Inventario → «Kardex» · «Cuentas por cobrar» · «Cuentas por pagar»', url: 'kardex', color: '#1b7a43',
      pruebas: [
        {
          id: 'VER-01', titulo: 'Cuadrar inventario y saldos del día', requiere: 'Administrador',
          pasos: [
            'Consulta A y B en «Kardex» y la existencia del promocional. Revisa el saldo de la venta 2 en «Cuentas por cobrar» y el de la compra en «Cuentas por pagar».'
          ],
          espera: [
            'A: inicial + 10 − 2. B: inicial + 2 − 1. Promocional: 5 − 1 = 4.',
            'Venta 2: su total menos $50.00. Compra: $100.80.'
          ]
        },
        {
          id: 'VER-02', titulo: 'Reunir lo que no le apareció a cada rol', requiere: 'Administrador',
          pasos: [
            'Revisa en esta prueba los pasos marcados Falló o Resultado no óptimo y anota, por rol, qué permiso o botón le faltó.'
          ],
          espera: [
            'Queda la lista de ajustes de permisos por rol para que cada área complete su parte del día sin ayuda del Administrador.'
          ]
        }
      ]
    }
  ]
};
