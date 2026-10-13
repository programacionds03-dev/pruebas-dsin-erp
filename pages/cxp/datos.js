/* ============================================================================
   Checklist de pruebas · Área: CXP (cuentas por pagar y tesorería) · DSIN ERP
   Tres pruebas por pantalla, cada una en una o dos líneas: qué hacer (con los
   datos obligatorios y lo que hay que tomar en cuenta) y el resultado esperado.
   Marcado: «rótulo de pantalla», `dato`, **negrita**, [[ruta|enlace al sistema]].
   ============================================================================ */
window.AREA = {
  id: 'cxp',
  nombre: 'CXP',
  corto: 'Antes de empezar',
  titulo: 'Pruebas de CXP',
  sub: 'Tres pruebas por pantalla: qué hacer, qué tomar en cuenta y qué debe responder el sistema.',
  color: '#7c3aed',
  version: '2026-10-09',
  intro: [
    {
      tipo: 'aviso', tono: 'ok', titulo: 'Cómo se hace cada prueba',
      html: 'Escribe tu nombre arriba, abre el sistema en otra pestaña y haz lo que dice «Haz esto». Compara con «Debe pasar» y marca **Correcto**, **Falló**, **Resultado no óptimo** o **No aplica**. Si algo falla o no te convence, escribe en el comentario el mensaje que salió y el número del documento que usaste. Al terminar el día pulsa «Descargar reporte».'
    },
    {
      tipo: 'aviso', tono: 'atencion', titulo: 'Qué necesitas antes de empezar',
      html: 'Para las pruebas de caja y de remesas a banco, **la caja física de hoy debe estar abierta** (la abre quien tiene ese permiso). Para las de cuentas por pagar necesitas un documento con saldo: nace de una compra al crédito procesada por Almacén o de un gasto con obligación en CXP (prueba GAS-01). Las pruebas de <span class="chip neg">Validación: el sistema debe impedirlo</span> comprueban que el sistema no deje hacer algo indebido.'
    },
    {
      tipo: 'aviso', tono: 'peligro', titulo: 'Lo que registres queda guardado',
      html: 'Un abono baja el saldo del proveedor, y **con tu usuario no se puede anular** un pago, un movimiento de caja ni un movimiento bancario. Usa los proveedores, documentos y cuentas de prueba que indique el coordinador, y montos pequeños.'
    }
  ],
  pantallas: [
    /* ============================================================== CUENTAS POR PAGAR */
    {
      id: 'cuentas', codigo: 'CXP', titulo: 'Cuentas por pagar', corto: 'Cuentas por pagar', ruta: 'Cuentas por pagar → «Cuentas por pagar»', url: 'cxp', color: '#7c3aed',
      pruebas: [
        {
          id: 'CXP-01', titulo: 'Abonar a un documento',
          pasos: [
            'Ubica un documento con saldo (el listado abre en «Pendientes») y pulsa «Abonar».',
            'Llena «Monto del abono» con menos que el saldo y «Forma de pago» (obligatorios), más «Referencia», y pulsa «Registrar abono».'
          ],
          espera: [
            '«Pago registrado; el saldo de la cuenta fue actualizado.». La cuenta pasa a «Parcialmente pagada».',
            'En el detalle del documento, el abono aparece en la tarjeta de pagos aplicados.'
          ],
          nota: 'Anota el documento: se usa en las pruebas siguientes.'
        },
        {
          id: 'CXP-02', titulo: 'Saldar el documento',
          pasos: [
            'En el mismo documento pulsa «Saldar», elige «Forma de pago», escribe «Referencia» y confirma con «Saldar».'
          ],
          espera: [
            '«Documento saldado correctamente.». La cuenta queda «Pagada» y ya no ofrece «Abonar» ni «Saldar».',
            'Con tu usuario no hay botón para anular un pago, y «Fecha efectiva» no se puede cambiar.'
          ]
        },
        {
          id: 'CXP-03', titulo: 'Consultar lo que se le debe a un proveedor',
          pasos: [
            'Abre la pestaña «Proveedores CXP», busca un proveedor y ábrelo con «Ver proveedor».'
          ],
          espera: [
            'Muestra «Total comprado», «Total pagado», «Saldo pendiente» y lo «Vencido», con sus documentos separados en pestañas.',
            'Solo ves documentos de tu sucursal.'
          ]
        }
      ]
    },

    /* ============================================================== CORTE, CALENDARIO Y NOTAS */
    {
      id: 'corte', codigo: 'COR', titulo: 'Corte diario, calendario y notas de crédito', corto: 'Corte · Calendario · Notas', ruta: 'Cuentas por pagar → «Corte diario de pagos» · «Calendario CXP» · «Notas de credito»', url: 'cxp/corte-diario', color: '#be185d',
      pruebas: [
        {
          id: 'COR-01', titulo: 'Revisar el corte diario de pagos',
          para: 'Hazla el mismo día de CXP-01 y CXP-02.',
          pasos: [
            'Abre «Corte diario de pagos» (viene con la fecha de hoy).'
          ],
          espera: [
            'El abono de CXP-01 suma en «Abonos» y el pago de CXP-02 en «Saldados», y los dos aparecen en «Pagos por forma».'
          ]
        },
        {
          id: 'COR-02', titulo: 'Ver los vencimientos en el calendario',
          pasos: [
            'Abre «Calendario CXP» y ubica un documento por vencer y uno vencido.'
          ],
          espera: [
            'Los vencidos salen en rojo, los próximos a vencer en amarillo y los vigentes en verde.',
            'El documento saldado en CXP-02 ya no aparece.'
          ]
        },
        {
          id: 'COR-03', titulo: 'Consultar las notas de crédito de proveedores',
          pasos: [
            'Abre «Notas de credito» y filtra por estado con «Todos los estados».'
          ],
          espera: [
            'Cada nota muestra su proveedor, la compra de origen, el «Concepto», el «Monto» y el «Saldo disponible».'
          ]
        }
      ]
    },

    /* ============================================================== QUEDANES */
    {
      id: 'quedanes', codigo: 'QUE', titulo: 'Quedanes de proveedores', corto: 'Quedanes proveedores', ruta: 'Cuentas por pagar → «Quedanes proveedores»', url: 'quedanes', color: '#b45309',
      pruebas: [
        {
          id: 'QUE-01', titulo: 'Registrar un quedan a un proveedor',
          pasos: [
            'Pulsa «Nuevo quedan» y cambia «Tipo» a proveedor (viene en cliente). Llena «Proveedor», «Número», «Monto» y «Fecha de emisión» (obligatorios), más «Fecha de vencimiento», y pulsa «Guardar quedan».'
          ],
          espera: [
            'Aviso verde de quedan registrado. La fila sale con tipo «Proveedor» y estado «Emitido».'
          ]
        },
        {
          id: 'QUE-02', titulo: 'Buscar quedanes',
          pasos: [
            'Filtra por «A proveedores (CxP)» y por «Emitido», o escribe el número en «Número...», y pulsa «Filtrar».'
          ],
          espera: [
            'Quedan solo los quedanes de proveedores emitidos, con su vencimiento y monto.'
          ]
        },
        {
          id: 'QUE-03', titulo: 'Fechas incoherentes y edición bloqueada', negativa: true,
          pasos: [
            'Intenta guardar un quedan con «Fecha de vencimiento» anterior a la «Fecha de emisión».'
          ],
          espera: [
            'No se guarda: la fecha de vencimiento debe ser igual o posterior a la de emisión.',
            'En el listado no hay lápiz ni papelera: marcar un quedan como pagado o anularlo lo hace otro rol.'
          ]
        }
      ]
    },

    /* ============================================================== GASTOS */
    {
      id: 'gastos', codigo: 'GAS', titulo: 'Registro de gastos', corto: 'Gastos', ruta: 'Gastos → «Registro de gastos» · «Dashboard de gastos»', url: 'gastos', color: '#0d9488',
      pruebas: [
        {
          id: 'GAS-01', titulo: 'Registrar una compra administrativa al crédito',
          pasos: [
            'Pulsa «Nueva compra administrativa» y llena los obligatorios: «Empresa», «Área / centro de gasto», «Categoría», «Descripción», un tipo en «Tipos de gasto», «Proveedor», «Tipo documento», «Número de documento», «Forma de pago» y «Fecha de vencimiento».',
            'Escribe «Total pagado del documento» = 113.00, deja marcado «Generar obligación en CXP» y pulsa «Guardar».'
          ],
          espera: [
            '«Gasto registrado correctamente.». Se crea con número GAS-…, estado «Pendiente», y el IVA calculado en 13.00.',
            'El documento aparece en «Cuentas por pagar» con ese proveedor y su vencimiento.'
          ],
          nota: 'Este gasto te sirve como documento con saldo para CXP-01.'
        },
        {
          id: 'GAS-02', titulo: 'Pagar el gasto desde cuentas por pagar',
          pasos: [
            'En el detalle del gasto pulsa «Ver CXP» y abona el total del documento.'
          ],
          espera: [
            'El gasto pasa a «Pagado» y su «Trazabilidad» registra el pago.',
            'El pago no crea movimientos en caja ni en bancos: eso se registra aparte.'
          ]
        },
        {
          id: 'GAS-03', titulo: 'Documento repetido y edición bloqueada', negativa: true,
          pasos: [
            'Registra otro gasto con el mismo proveedor, tipo y número de documento de GAS-01.'
          ],
          espera: [
            '«Este documento ya fue registrado para el proveedor.» y no se guarda.',
            'En el detalle de un gasto no aparecen «Editar» ni «Anular».'
          ]
        }
      ]
    },

    /* ============================================================== CAJA FÍSICA */
    {
      id: 'caja', codigo: 'CAJ', titulo: 'Caja física', corto: 'Caja física', ruta: 'Tesoreria → «Caja Fisica Central» · «Movimientos» · «Remesas»', url: 'caja-fisica', color: '#1c58ad',
      pruebas: [
        {
          id: 'CAJ-01', titulo: 'Registrar un ingreso a caja',
          para: 'La caja de hoy debe estar abierta.',
          pasos: [
            'En Tesoreria → «Movimientos», en la tarjeta «Nuevo movimiento», llena «Empresa», «Forma pago», «Monto» = 25.00 y «Observaciones» (obligatorios) y pulsa «Guardar movimiento».'
          ],
          espera: [
            '«Movimiento de Caja Fisica registrado.». La fila sale como «Ingreso» y «Activo».',
            'En «Caja Fisica Central» el «Saldo esperado» sube 25.00.'
          ]
        },
        {
          id: 'CAJ-02', titulo: 'Registrar una remesa de caja',
          para: 'La caja de hoy debe estar abierta.',
          pasos: [
            'En Tesoreria → «Remesas», en «Nueva remesa», llena «Fecha», «Recibe» y una línea con «Empresa», «Forma pago» y «Monto» = 10.00, y pulsa «Guardar remesa».'
          ],
          espera: [
            '«Remesa de Caja Fisica registrada.». La remesa sale «Emitida».',
            'En «Caja Fisica Central» sube «Total remesado» y el «Saldo esperado» baja 10.00.'
          ]
        },
        {
          id: 'CAJ-03', titulo: 'Lo que no se hace con tu usuario en caja', negativa: true,
          pasos: [
            'Busca el botón «Abrir caja» en «Caja Fisica Central», y las tarjetas «Nuevo gasto» y «Nuevo desembolso» en sus pantallas. En «Movimientos» busca cómo editar o anular uno.'
          ],
          espera: [
            'No aparece ninguno: abrir y cerrar la caja, registrar gastos y desembolsos de caja, y anular, lo hace otro rol.'
          ]
        }
      ]
    },

    /* ============================================================== BANCOS */
    {
      id: 'bancos', codigo: 'BAN', titulo: 'Bancos', corto: 'Bancos', ruta: 'Tesoreria → «Cuentas bancarias» · «Movimientos bancarios» · «Remesas a banco» · «Catalogo de bancos»', url: 'bancos/cuentas', color: '#2563eb',
      pruebas: [
        {
          id: 'BAN-01', titulo: 'Registrar un movimiento bancario',
          pasos: [
            'En «Movimientos bancarios», en «Registrar movimiento», llena «Cuenta bancaria», «Fecha», «Monto» = 100.00 y «Tipo de movimiento» = Deposito (obligatorios) y pulsa «Registrar».'
          ],
          espera: [
            '«Movimiento bancario registrado.». La fila sale con +$100.00 y «Activo».',
            'En «Cuentas bancarias» el «Saldo actual» de esa cuenta sube 100.00.'
          ]
        },
        {
          id: 'BAN-02', titulo: 'Remesar de caja al banco',
          para: 'La caja de hoy debe estar abierta.',
          pasos: [
            'En «Remesas a banco» llena «Cuenta bancaria destino», «Fecha» y «Monto» = 50.00 (obligatorios) y pulsa «Registrar remesa».'
          ],
          espera: [
            '«Remesa registrada: el dinero salio de Caja Fisica y entro al banco.».',
            'El «Saldo actual» de la cuenta sube 50.00 y el «Saldo esperado» de la caja baja 50.00.'
          ]
        },
        {
          id: 'BAN-03', titulo: 'Bancos y cuentas no se crean con tu usuario', negativa: true,
          pasos: [
            'Busca las tarjetas «Nuevo banco» en «Catalogo de bancos» y «Nueva cuenta bancaria» en «Cuentas bancarias», y en «Movimientos bancarios» busca cómo anular uno.'
          ],
          espera: [
            'No aparece ninguna: tu usuario consulta bancos y cuentas, y registra movimientos y remesas, pero no los anula.'
          ]
        }
      ]
    },

    /* ============================================================== TRIBUTOS */
    {
      id: 'tributos', codigo: 'TRI', titulo: 'Tributos: panel de IVA, libros y retenciones', corto: 'Tributos', ruta: 'Tributos → «Panel de IVA» · «Libro de compras» · «Retenciones y percepciones»', url: 'tributos', color: '#475569',
      pruebas: [
        {
          id: 'TRI-01', titulo: 'Consultar el panel de IVA de un mes',
          pasos: [
            'En «Panel de IVA» elige un «Mes» y pulsa «Consultar».'
          ],
          espera: [
            'Muestra «IVA debito fiscal (ventas)», «IVA credito fiscal (compras)» y el resultado del periodo como «IVA por pagar» o «Saldo a favor».',
            'El «Calculo del periodo» llega a ese mismo resultado paso a paso.'
          ]
        },
        {
          id: 'TRI-02', titulo: 'Cuadrar el libro de compras y las retenciones con el panel',
          pasos: [
            'Abre «Libro de compras» del mismo mes y revisa «Totales del periodo». Luego abre «Retenciones y percepciones».'
          ],
          espera: [
            'El «Credito fiscal» del libro coincide con el crédito fiscal del panel.',
            '«IVA que retuvimos a proveedores (a enterar)» coincide con la retención a proveedores del panel.'
          ]
        },
        {
          id: 'TRI-03', titulo: 'El mes manda sobre las fechas; anexos y cierre no son de CXP', negativa: true,
          pasos: [
            'Llena «Desde» y «Hasta» con otro rango, pero deja «Mes» con valor, y pulsa «Consultar».',
            'Busca botones de anexos y la tarjeta «Cierre del periodo».'
          ],
          espera: [
            'La consulta usa el mes y no el rango (para usar fechas libres hay que vaciar «Mes»).',
            'No aparecen anexos ni cierre de periodo: tu usuario solo consulta.'
          ]
        }
      ]
    },

    /* ============================================================== HOJAS DE RUTA */
    {
      id: 'hojas', codigo: 'HOJ', titulo: 'Hojas de ruta', corto: 'Hojas de ruta', ruta: 'Rutas → «Hojas de ruta»', url: 'rutas', color: '#0d9488',
      pruebas: [
        {
          id: 'HOJ-01', titulo: 'Buscar una hoja de ruta',
          pasos: [
            'Filtra el listado por fechas y por estado, y pulsa «Filtrar».'
          ],
          espera: [
            'Cada hoja muestra su lugar, rutero, «Paradas», «Avance», «Cobrado» y «Estado».'
          ]
        },
        {
          id: 'HOJ-02', titulo: 'Revisar las paradas de una hoja',
          pasos: [
            'Abre una hoja con el ojo y revisa sus paradas, «Cobros de la ruta» y «Bitácora de la hoja de ruta».'
          ],
          espera: [
            'Se ve cada parada con su estado (pendiente, entregada o no realizada) y lo que se cobró en la ruta.'
          ]
        },
        {
          id: 'HOJ-03', titulo: 'Las hojas no se arman desde CXP', negativa: true,
          pasos: [
            'Busca los botones «Nueva hoja de ruta» en el listado e «Iniciar ruta» dentro de una hoja.'
          ],
          espera: [
            'No aparecen: las hojas de ruta las arma el área de Ruta.'
          ]
        }
      ]
    },

    /* ============================================================== GESTIONES */
    {
      id: 'gestiones', codigo: 'GES', titulo: 'Gestiones y documentos pendientes de ruta', corto: 'Gestiones de ruta', ruta: 'Rutas → «Gestiones» · «Consulta de gestiones» · «Documentos pendientes»', url: 'rutas-gestiones', color: '#7c3aed',
      pruebas: [
        {
          id: 'GES-01', titulo: 'Pedir a Ruta una gestión de pago',
          pasos: [
            'Pulsa «Nueva gestión» y llena los obligatorios: «Tipo de persona», «Proveedor» (o «Cliente»), «Lugar de gestión», «Tipo de gestión» (por ejemplo un pago o la entrega de un quedan), «Prioridad», «Descripción», «Área que envía», «Lugar de ruta» y «Fecha».',
            'Llena los campos extra que aparezcan (documento, monto y forma de pago esperada) y pulsa «Guardar gestión».'
          ],
          espera: [
            '«Gestión registrada. Queda pendiente de asignar a una hoja de ruta.» y queda «Pendiente».',
            'Con tu usuario no aparecen «Editar» ni «Cancelar gestión».'
          ]
        },
        {
          id: 'GES-02', titulo: 'Buscar gestiones y ver su avance',
          pasos: [
            'En «Gestiones» busca la de GES-01 por cliente y por estado Pendiente. Después búscala en «Consulta avanzada».'
          ],
          espera: [
            'La gestión aparece «Pendiente»; cuando Ruta la asigna a una hoja pasa a «Asignada» y luego a «En ruta».'
          ]
        },
        {
          id: 'GES-03', titulo: 'Ver las ventas pendientes de ruta',
          pasos: [
            'En «Documentos pendientes» filtra por cliente o por ruta, mira la columna «Despacho de bodega» y pulsa «Ver» en una fila.'
          ],
          espera: [
            'Solo aparecen ventas con ruta, marcadas «Sin despachar» o «Despachado», y «Ver» abre el «Detalle del DTE».',
            'No hay casillas ni «Asignar a la hoja de ruta»: eso lo hace el área de Ruta.'
          ]
        }
      ]
    },

    /* ============================================================== COMBUSTIBLE */
    {
      id: 'combustible', codigo: 'CMB', titulo: 'Combustible', corto: 'Combustible', ruta: 'Logística → «Combustible»', url: 'combustible', color: '#b45309',
      pruebas: [
        {
          id: 'CMB-01', titulo: 'Registrar una carga de combustible',
          pasos: [
            'Pulsa «Nueva carga», llena «Vehículo», «Fecha», «Galones» = 10.50 y «Costo ($)» = 42.00 (obligatorios), más «Kilometraje» y «Estación», y pulsa «Guardar carga».'
          ],
          espera: [
            '«Carga de combustible registrada.». La fila sale con tu nombre en «Registró» y el «Gasto del mes» sube 42.00.'
          ]
        },
        {
          id: 'CMB-02', titulo: 'Filtrar por vehículo y fechas',
          pasos: [
            'Elige el vehículo, llena **las dos** fechas y pulsa «Filtrar».'
          ],
          espera: [
            'Solo quedan las cargas de ese vehículo en el rango. Con una sola fecha el rango no se aplica.'
          ]
        },
        {
          id: 'CMB-03', titulo: 'Carga sin kilometraje',
          pasos: [
            'Registra otra carga con los obligatorios y dejando «Kilometraje» vacío (es opcional).'
          ],
          espera: [
            'Se guarda igual, con «Carga de combustible registrada.». Si en su lugar sale una página de error, márcalo como Falló.'
          ]
        }
      ]
    },

    /* ============================================================== REPARACIONES */
    {
      id: 'reparaciones', codigo: 'REP', titulo: 'Reparaciones', corto: 'Reparaciones', ruta: 'Logística → «Reparaciones»', url: 'reparaciones', color: '#475569',
      pruebas: [
        {
          id: 'REP-01', titulo: 'Registrar una reparación',
          pasos: [
            'Pulsa «Nueva reparación», llena «Vehículo», «Fecha», «Costo ($)» = 85.00 y «Descripción del trabajo» (obligatorios), más «Taller», «Kilometraje» y «Próxima revisión», y pulsa «Guardar reparación».'
          ],
          espera: [
            '«Reparación registrada.». La fila muestra el taller, el costo y la fecha en «Próx. revisión».'
          ]
        },
        {
          id: 'REP-02', titulo: 'Filtrar por vehículo',
          pasos: [
            'Elige el vehículo en el filtro y pulsa «Filtrar».'
          ],
          espera: [
            'Solo quedan las reparaciones de ese vehículo; una descripción larga se corta con puntos suspensivos.'
          ]
        },
        {
          id: 'REP-03', titulo: 'Descripción vacía y edición bloqueada', negativa: true,
          pasos: [
            'Intenta guardar una reparación escribiendo solo espacios en «Descripción del trabajo».'
          ],
          espera: [
            '«El campo descripción es obligatorio.» y no se guarda.',
            'En el listado no hay lápiz ni papelera.'
          ]
        }
      ]
    },

    /* ============================================================== ACTIVOS FIJOS */
    {
      id: 'activos-fijos', codigo: 'ACF', titulo: 'Activos fijos', corto: 'Activos fijos', ruta: 'Activos Fijos → «Activos fijos» · «Activos por colaborador»', url: 'activos', color: '#475569',
      pruebas: [
        {
          id: 'ACF-01', titulo: 'Asignar un activo directamente a un colaborador',
          pasos: [
            'En «Activos fijos» pulsa «Asignación directa». Llena «Colaborador que recibe» y «Motivo de la asignación» (obligatorios), agrega un activo con «Agregar activo fuera de inventario» y pulsa «Asignar y generar acta».'
          ],
          espera: [
            'Aviso verde de asignación directa registrada, con el número de su acta. El activo nace con código AF-… y estado «Asignado».'
          ],
          nota: 'Si agregas un producto de inventario, también es obligatoria la «Bodega de descarga» y la unidad sale del inventario.'
        },
        {
          id: 'ACF-02', titulo: 'Consultar los activos de un colaborador',
          para: 'Hazla después de ACF-01.',
          pasos: [
            'En «Activos por colaborador» elige a la persona de ACF-01 en «Seleccione un colaborador...».'
          ],
          espera: [
            'Muestra cuántos activos tiene en resguardo e incluye el que le asignaste, con su estado.'
          ]
        },
        {
          id: 'ACF-03', titulo: 'Activo de inventario sin bodega', negativa: true,
          pasos: [
            'En «Asignación directa» agrega un producto con «Agregar producto de inventario», deja la bodega sin elegir y pulsa «Asignar y generar acta».'
          ],
          espera: [
            '«Debe indicar la bodega desde la que se descargarán los activos de inventario.» y no se registra.'
          ]
        }
      ]
    },

    /* ============================================================== SOLICITUDES DE ACTIVOS */
    {
      id: 'activos', codigo: 'ACT', titulo: 'Solicitudes de activos', corto: 'Solicitudes de activos', ruta: 'Activos Fijos → «Solicitudes de activos»', url: 'activos-solicitudes', color: '#b45309',
      pruebas: [
        {
          id: 'ACT-01', titulo: 'Crear una solicitud',
          pasos: [
            'Pulsa «Nueva solicitud», llena «Colaborador que recibirá los activos», «Supervisor que aprueba» y «Motivo de la solicitud» (obligatorios).',
            'Agrega un producto de inventario y un «Agregar activo fuera de inventario» con su «Descripción del activo», y pulsa «Enviar solicitud».'
          ],
          espera: [
            '«Solicitud SAF-… enviada al supervisor.» y queda «Pendiente de supervisor».',
            'Sin ningún activo agregado no se envía.'
          ],
          nota: 'Anota el número SAF: se usa en ACT-02.'
        },
        {
          id: 'ACT-02', titulo: 'Aprobar la solicitud', requiere: 'Supervisor del área',
          pasos: [
            'El supervisor abre la solicitud de ACT-01 desde su listado y pulsa «Aprobar» (o «Rechazar») en «Aprobación del supervisor».'
          ],
          espera: [
            '«Solicitud aprobada: pasa a revisión de Administración.» (o «Solicitud rechazada por el supervisor.»), y el historial registra la decisión.',
            'El sistema no le envía aviso: la encuentra en su listado.'
          ]
        },
        {
          id: 'ACT-03', titulo: 'Cancelar mi solicitud',
          pasos: [
            'Crea otra solicitud, pulsa «Cancelar solicitud» y fíltrala en el listado por el estado «Cancelada».'
          ],
          espera: [
            '«Solicitud SAF-… cancelada.» y ya no ofrece «Cancelar solicitud».',
            'En el listado solo aparecen tus solicitudes.'
          ]
        }
      ]
    }
  ]
};
