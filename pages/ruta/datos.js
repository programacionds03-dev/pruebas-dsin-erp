/* ============================================================================
   Checklist de pruebas · Área: Ruta · DSIN ERP
   Tres pruebas por pantalla, cada una en una o dos líneas: qué hacer (con los
   datos obligatorios y lo que hay que tomar en cuenta) y el resultado esperado.
   Marcado: «rótulo de pantalla», `dato`, **negrita**, [[ruta|enlace al sistema]].
   ============================================================================ */
window.AREA = {
  id: 'ruta',
  nombre: 'Ruta',
  corto: 'Antes de empezar',
  titulo: 'Pruebas de Ruta',
  sub: 'Tres pruebas por pantalla: qué hacer, qué tomar en cuenta y qué debe responder el sistema.',
  color: '#0d9488',
  version: '2026-10-09',
  intro: [
    {
      tipo: 'aviso', tono: 'ok', titulo: 'Cómo se hace cada prueba',
      html: 'Escribe tu nombre arriba, abre el sistema en otra pestaña y haz lo que dice «Haz esto». Compara con «Debe pasar» y marca **Correcto**, **Falló**, **Resultado no óptimo** o **No aplica**. Si algo falla o no te convence, escribe en el comentario el mensaje que salió y el número de la hoja o del documento que usaste. Al terminar el día pulsa «Descargar reporte».'
    },
    {
      tipo: 'aviso', tono: 'atencion', titulo: 'Sigue el orden: la ruta se prueba de principio a fin',
      html: 'Las pruebas van encadenadas: se registra el rutero y el vehículo, se crea la hoja, se le asignan documentos y gestiones, el rutero entrega **con su propio usuario** y al final se revisan los reportes. Las pruebas con la etiqueta <span class="chip neg">Validación: el sistema debe impedirlo</span> comprueban que el sistema no deje hacer algo indebido.'
    },
    {
      tipo: 'aviso', tono: 'peligro', titulo: 'Lo que registres queda guardado',
      html: 'Una entrega registrada marca el documento como despachado y suma cobros a la hoja. Con tu usuario no se editan ni se borran ruteros, vehículos ni hojas: usa los documentos de prueba que indique el coordinador y nombra lo que crees PRUEBA + tus iniciales.'
    }
  ],
  pantallas: [
    /* ============================================================== RUTEROS */
    {
      id: 'ruteros', codigo: 'RTR', titulo: 'Ruteros', corto: 'Ruteros', ruta: 'Rutas → «Ruteros»', url: 'ruteros', color: '#475569',
      pruebas: [
        {
          id: 'RTR-01', titulo: 'Registrar un rutero',
          pasos: [
            'Pulsa «Nuevo rutero», llena «Nombre» (obligatorio) y «Teléfono», elige en «Usuario del sistema» el usuario con el que ese rutero entra al sistema, y pulsa «Guardar».'
          ],
          espera: [
            'Aviso verde de rutero creado. La fila sale «Activo», con su usuario y «Rutas» en 0.'
          ],
          nota: 'El «Usuario del sistema» es lo que le permite al rutero ver sus hojas en «Entrega de ruta».'
        },
        {
          id: 'RTR-02', titulo: 'Usar el rutero en una hoja',
          para: 'Hazla después de HOJ-01.',
          pasos: [
            'Vuelve al listado de ruteros después de crear la hoja de HOJ-01 con ese rutero.'
          ],
          espera: [
            'El rutero apareció en el selector «Rutero» de la hoja nueva y su contador «Rutas» subió a 1.'
          ]
        },
        {
          id: 'RTR-03', titulo: 'Usuario sin rutero vinculado', negativa: true,
          pasos: [
            'Entra a Rutas → «Entrega de ruta» con un usuario que no esté elegido como «Usuario del sistema» de ningún rutero.'
          ],
          espera: [
            'Sale la insignia «Usuario sin rutero vinculado» y no se lista ninguna hoja.',
            'En el listado de ruteros no hay lápiz ni papelera.'
          ]
        }
      ]
    },

    /* ============================================================== VEHÍCULOS */
    {
      id: 'vehiculos', codigo: 'VEH', titulo: 'Vehículos', corto: 'Vehículos', ruta: 'Logística → «Vehículos»', url: 'vehiculos', color: '#1c58ad',
      pruebas: [
        {
          id: 'VEH-01', titulo: 'Registrar un vehículo',
          pasos: [
            'Pulsa «Nuevo vehículo», llena «Nombre / alias» (obligatorio), «Placa», «Marca», «Modelo», «Año» y «Kilometraje actual» = 10000, y pulsa «Guardar vehículo».'
          ],
          espera: [
            'Aviso verde de vehículo creado. La fila sale «Activo», con 10,000 km y «Cargas» y «Reparaciones» en 0.'
          ]
        },
        {
          id: 'VEH-02', titulo: 'Ver cómo suben el kilometraje y los conteos',
          para: 'Hazla después de CMB-01 y REP-01, registradas con este vehículo.',
          pasos: [
            'Busca el vehículo con «Nombre o placa...» y pulsa «Filtrar».'
          ],
          espera: [
            '«Kilometraje» muestra el de la carga de combustible (10,500 km), «Cargas» dice 1 y «Reparaciones» dice 1.',
            'El kilometraje de la reparación no lo cambia: solo lo sube una carga de combustible con un valor mayor.'
          ]
        },
        {
          id: 'VEH-03', titulo: 'Placa repetida', negativa: true,
          pasos: [
            'Registra otro vehículo con la misma «Placa» de VEH-01.'
          ],
          espera: [
            '«El valor de placa ya está registrado.» y no se guarda.',
            'En el listado no hay lápiz ni papelera.'
          ]
        }
      ]
    },

    /* ============================================================== HOJAS DE RUTA */
    {
      id: 'hojas', codigo: 'HOJ', titulo: 'Hojas de ruta', corto: 'Hojas de ruta', ruta: 'Rutas → «Hojas de ruta»', url: 'rutas', color: '#0d9488',
      pruebas: [
        {
          id: 'HOJ-01', titulo: 'Crear una hoja de ruta',
          pasos: [
            'Pulsa «Nueva hoja de ruta», llena «Lugar de ruta (destino)» y «Fecha de ruta» (obligatorios), elige el «Rutero» de RTR-01 y el «Vehículo» de VEH-01, y pulsa «Crear hoja de ruta».'
          ],
          espera: [
            'Se crea con número HR-… y estado «Programada», todavía sin paradas.'
          ],
          nota: 'Anota el número de la hoja: se usa en las pruebas siguientes.'
        },
        {
          id: 'HOJ-02', titulo: 'Armar la hoja con documentos y gestiones',
          pasos: [
            'En el detalle de la hoja marca documentos en «Documentos pendientes de asignar» y pulsa «Asignar documentos seleccionados».',
            'Haz lo mismo en «Gestiones pendientes de asignar» con «Asignar gestiones seleccionadas» (o usa «Precargar pendientes» para traer todo).'
          ],
          espera: [
            'Cada documento y gestión aparece como parada «Pendiente» en el orden de visita.',
            'Solo se ofrecen documentos de la misma sucursal y del mismo destino de la hoja.'
          ]
        },
        {
          id: 'HOJ-03', titulo: 'Imprimir la hoja y filtrar el listado',
          pasos: [
            'En el detalle abre «Documentos» → «Hoja de ruta (antes de salir)».',
            'En el listado filtra por rutero y por estado, y pulsa «Filtrar».'
          ],
          espera: [
            'El PDF lista las paradas de la hoja en su orden.',
            'El listado muestra la hoja con sus «Paradas», «Avance», «Cobrado» y «Estado».'
          ]
        }
      ]
    },

    /* ============================================================== DOCUMENTOS PENDIENTES */
    {
      id: 'documentos', codigo: 'DOC', titulo: 'Documentos pendientes de ruta', corto: 'Documentos pendientes', ruta: 'Rutas → «Documentos pendientes»', url: 'rutas-documentos', color: '#2563eb',
      pruebas: [
        {
          id: 'DOC-01', titulo: 'Consultar lo que falta por asignar',
          pasos: [
            'Elige un destino en «Todo destino de ruta», pulsa «Filtrar» y revisa los indicadores y la columna «Despacho de bodega».'
          ],
          espera: [
            'Solo salen ventas con ruta de tu sucursal que aún no están en ninguna hoja, con «Sin despachar» o «Despachado».',
            '«Pendientes de asignar» y «Monto pendiente» coinciden con la lista.'
          ]
        },
        {
          id: 'DOC-02', titulo: 'Asignar documentos a una hoja desde aquí',
          pasos: [
            'Marca dos documentos, elige la hoja de HOJ-01 en «Seleccione la hoja de ruta...» y pulsa «Asignar a la hoja de ruta».'
          ],
          espera: [
            'Avisa cuántos documentos se asignaron a la hoja; desaparecen de esta lista y baja «Pendientes de asignar».',
            'En la hoja aparecen como paradas nuevas.'
          ]
        },
        {
          id: 'DOC-03', titulo: 'Las ventas de sala no entran a ruta', negativa: true,
          pasos: [
            'Busca por su número, en «N.º de control, código de generación o cliente...», una venta que se entregó en sala de ventas.'
          ],
          espera: [
            'No aparece: «Sin documentos de ruta para los criterios indicados. Las ventas de Sala de Ventas no se muestran aquí.».'
          ]
        }
      ]
    },

    /* ============================================================== GESTIONES */
    {
      id: 'gestiones', codigo: 'GES', titulo: 'Gestiones de ruta', corto: 'Gestiones', ruta: 'Rutas → «Gestiones» · «Consulta de gestiones»', url: 'rutas-gestiones', color: '#7c3aed',
      pruebas: [
        {
          id: 'GES-01', titulo: 'Registrar una gestión',
          pasos: [
            'Pulsa «Nueva gestión» y llena los obligatorios: «Tipo de persona», «Cliente» (o «Proveedor»), «Lugar de gestión», «Tipo de gestión», «Prioridad», «Descripción», «Área que envía», «Lugar de ruta» y «Fecha».',
            'Según el «Tipo de gestión» aparecen campos extra (documento, monto, producto o serie): llénalos y pulsa «Guardar gestión».'
          ],
          espera: [
            '«Gestión registrada. Queda pendiente de asignar a una hoja de ruta.» y queda «Pendiente».'
          ],
          nota: 'Usa el mismo «Lugar de ruta» de la hoja de HOJ-01 para poder asignársela.'
        },
        {
          id: 'GES-02', titulo: 'Buscar gestiones',
          pasos: [
            'En «Gestiones» busca la de GES-01 por cliente y por estado Pendiente. Después búscala en «Consulta avanzada» por «N.º documento» o por monto.'
          ],
          espera: [
            'La gestión aparece «Pendiente» y los indicadores de arriba cambian con el filtro.'
          ]
        },
        {
          id: 'GES-03', titulo: 'Seguir la gestión mientras va en la hoja',
          para: 'Hazla junto con HOJ-02 y ENT-01.',
          pasos: [
            'Consulta la gestión de GES-01 después de asignarla a la hoja, después de iniciar la ruta y después de registrar su visita.'
          ],
          espera: [
            'Pasa de «Pendiente» a «Asignada», luego a «En ruta» y al final a «Realizada» (o «No realizada» si no se pudo hacer).'
          ]
        }
      ]
    },

    /* ============================================================== DESPACHOS */
    {
      id: 'despachos', codigo: 'DES', titulo: 'Despachos', corto: 'Despachos', ruta: 'Facturación → «Despachos»', url: 'despachos', color: '#2563eb',
      pruebas: [
        {
          id: 'DES-01', titulo: 'Preparar un despacho con series y ubicación',
          para: 'Necesita una venta pendiente de tu sucursal (la emite Ventas).',
          pasos: [
            'En la venta pulsa «Preparar despacho (pestaña nueva)». En «Series entregadas» lee una serie por unidad y en «Cantidad a tomar» reparte las unidades por ubicación hasta completar «Total seleccionado».',
            'Pulsa «Guardar despacho» y luego «PDF».'
          ],
          espera: [
            '«Despacho registrado correctamente.». La venta queda «Despachado» y sale de los pendientes.',
            'El PDF «Hoja de Series» lista producto, serie y garantía.'
          ]
        },
        {
          id: 'DES-02', titulo: 'Consultar un documento y despachar sin series',
          pasos: [
            'Busca un documento en «Consulta de documento» con su «Numero de documento».',
            'En una venta cuyo producto **no tenga ubicación física**, pulsa la X roja de «Accion» y acepta.'
          ],
          espera: [
            'La consulta muestra el estado del documento y «Ver venta».',
            'La venta se despacha sin series y sale de la lista. Si el producto sí tiene ubicación física, no deja: faltan unidades por asignar.'
          ]
        },
        {
          id: 'DES-03', titulo: 'Despachos que el sistema debe impedir', negativa: true,
          pasos: [
            'En «Preparar despacho» de un producto con ubicaciones físicas, guarda con «Cantidad a tomar» en 0 y luego con un número mayor que «Disponible».',
            'Busca una venta que ya despachaste.'
          ],
          espera: [
            'No guarda en ningún caso: faltan unidades por asignar, o la ubicación no dispone de tantas.',
            'La venta ya despachada solo ofrece «Ver despacho» y «PDF».'
          ]
        }
      ]
    },

    /* ============================================================== ENTREGA DE RUTA */
    {
      id: 'entrega', codigo: 'ENT', titulo: 'Entrega de ruta', corto: 'Entrega de ruta', ruta: 'Rutas → «Entrega de ruta»', url: 'rutas-entrega', color: '#c2410c',
      pruebas: [
        {
          id: 'ENT-01', titulo: 'Iniciar la ruta y registrar una entrega',
          para: 'Entra con el usuario del rutero de RTR-01. La hoja de HOJ-01 debe tener paradas.',
          pasos: [
            'En «Mis rutas pendientes» pulsa «Iniciar ruta». En una parada pulsa «Registrar Entrega», elige «Resultado» = Entregada (obligatorio) y llena quién recibe, el cobro y la firma.'
          ],
          espera: [
            '«Ruta iniciada. Registre cada entrega conforme la realice.» y después «Entrega registrada correctamente.».',
            'La parada queda «Entregado» y el cobro suma en «Cobros de la ruta» de la hoja.'
          ]
        },
        {
          id: 'ENT-02', titulo: 'Reportar una visita que no se pudo hacer',
          pasos: [
            'En otra parada pulsa «Reportar incidencia», deja «Resultado» en No realizada y llena «Motivo» (obligatorio).'
          ],
          espera: [
            'La parada queda «No entregado» con su motivo y no suma cobro.',
            'Sin motivo no deja guardar.'
          ]
        },
        {
          id: 'ENT-03', titulo: 'Finalizar la ruta',
          pasos: [
            'Pulsa «Finalizar ruta», escribe «Observaciones de la ruta» y confirma.'
          ],
          espera: [
            '«Ruta entregada. Preséntela en caja para su recepción.». La hoja pasa a «Historial».',
            'En «Hojas de ruta» sale «Entregada por el rutero»: recibirla en caja y finalizarla le toca a otra área.'
          ]
        }
      ]
    },

    /* ============================================================== DASHBOARD Y REPORTES */
    {
      id: 'reportes', codigo: 'RPT', titulo: 'Dashboard y reportes de ruta', corto: 'Dashboard y reportes', ruta: 'Rutas → «Dashboard de rutas» · «Reportes de ruta»', url: 'rutas-dashboard', color: '#be185d',
      pruebas: [
        {
          id: 'RPT-01', titulo: 'Revisar el dashboard del día y de un rango',
          pasos: [
            'Abre «Dashboard de rutas» sin tocar los filtros. Luego amplía las fechas y pulsa «Actualizar».'
          ],
          espera: [
            'Al entrar muestra solo hoy; con el rango, los indicadores «Hojas de ruta», «Paradas», «Entregadas» y «Cobrado en ruta» cambian.',
            '«Paradas» es igual a la suma de «Estado de paradas».'
          ]
        },
        {
          id: 'RPT-02', titulo: 'Ver las entregas en los reportes',
          para: 'Hazla después de ENT-01 y ENT-02.',
          pasos: [
            'En «Reportes de ruta» elige «Entregas realizadas», el rutero, y pulsa «Consultar». Repite con «Productividad por rutero».'
          ],
          espera: [
            'Sale la entrega de ENT-01 como «Entregada» con su total y la de ENT-02 como «No realizada» con su motivo.',
            'En productividad, el rutero suma sus paradas, entregadas y cobros.'
          ]
        },
        {
          id: 'RPT-03', titulo: 'Cobros por hoja y gestiones pendientes',
          pasos: [
            'Consulta el reporte «Cobros por hoja de ruta» y después «Gestiones pendientes».'
          ],
          espera: [
            'Cobros lista solo las hojas que cobraron algo, con el desglose por forma de pago.',
            'Gestiones pendientes lista las que siguen «Pendiente», «No realizada» o «Reasignada».'
          ]
        }
      ]
    },

    /* ============================================================== PROGRAMACIÓN DE SALIDAS */
    {
      id: 'salidas', codigo: 'LOG', titulo: 'Programación de salidas', corto: 'Programación de salidas', ruta: 'Logística → «Programación de salidas» · «Calendario»', url: 'logistica-salidas', color: '#2563eb',
      pruebas: [
        {
          id: 'LOG-01', titulo: 'Programar una salida',
          pasos: [
            'Pulsa «Programar salida», llena «Fecha» y «Destino» (obligatorios), agrega «Hora salida», «Vehículo» y «Técnicos», y pulsa «Guardar salida».'
          ],
          espera: [
            '«Salida programada para el …» con la fecha. La fila queda «Programada», con el vehículo y los técnicos.'
          ]
        },
        {
          id: 'LOG-02', titulo: 'Verla en el listado y en el calendario',
          pasos: [
            'Filtra el listado por esa fecha y por «Programada». Luego pulsa «Calendario».'
          ],
          espera: [
            'El filtro deja solo esa salida, y en el calendario aparece en su día con la hora y el destino.'
          ]
        },
        {
          id: 'LOG-03', titulo: 'Una salida programada no se edita', negativa: true,
          pasos: [
            'En el «Calendario» haz clic sobre la salida.'
          ],
          espera: [
            '«Acceso no autorizado»: tu usuario programa salidas, pero no las edita ni les cambia el estado.',
            'En el listado no hay lápiz ni papelera.'
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
            'Pulsa «Nueva carga», elige el vehículo de VEH-01, llena «Fecha», «Galones» = 10.50 y «Costo ($)» = 42.00 (obligatorios), más «Kilometraje» = 10500 y «Estación», y pulsa «Guardar carga».'
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
            'Pulsa «Nueva reparación», elige el vehículo de VEH-01, llena «Fecha», «Costo ($)» = 85.00 y «Descripción del trabajo» (obligatorios), más «Taller», «Kilometraje» y «Próxima revisión», y pulsa «Guardar reparación».'
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

    /* ============================================================== CONSULTAS DTE */
    {
      id: 'dte', codigo: 'DTE', titulo: 'Documentos DTE, remisiones, retornos e invalidaciones', corto: 'Consultas de documentos', ruta: 'Facturación → «Documentos DTE» · «Notas de crédito» · «Notas de remisión» · «Eventos de retorno» · «Invalidaciones»', url: 'ventas', color: '#1c58ad',
      pruebas: [
        {
          id: 'DTE-01', titulo: 'Buscar las ventas que van por ruta',
          pasos: [
            'En «Documentos DTE» filtra por estado Transmitida y entrega Pendiente de ruta, con **las dos** fechas (con una sola no filtra), y abre un documento con «Ver detalle».'
          ],
          espera: [
            'Solo salen documentos de tu sucursal, y el detalle muestra productos y cantidades.',
            'Los mismos documentos están en Rutas → «Documentos pendientes».'
          ]
        },
        {
          id: 'DTE-02', titulo: 'Leer y dejar comentarios de entrega',
          pasos: [
            'En el detalle de un documento **por ruta**, llena «Comentario» (obligatorio) en «Agregar comentario de entrega», pega un enlace de Maps o Waze en la ubicación y guarda.',
            'Repite con un enlace de otro sitio.'
          ],
          espera: [
            '«Comentario agregado a la venta.», con el botón «Abrir ubicación de entrega».',
            'Con otro enlace: «El enlace de ubicación debe ser una URL de Google Maps o Waze.».'
          ]
        },
        {
          id: 'DTE-03', titulo: 'Consultar remisiones, retornos e invalidaciones',
          pasos: [
            'Abre un documento en «Notas de remisión», uno en «Eventos de retorno» y uno en «Invalidaciones».'
          ],
          espera: [
            'Cada pantalla lista solo su tipo de documento y deja abrir el detalle.',
            'Los retornos indican en «Inventario» si el producto «Reingresa» o queda «Sin reingreso».'
          ]
        }
      ]
    }
  ]
};
