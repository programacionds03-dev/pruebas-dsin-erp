/* ============================================================================
   Checklist de pruebas · Área: PM (Product Managers) · DSIN ERP
   Tres pruebas por pantalla, cada una en una o dos líneas: qué hacer (con los
   datos obligatorios y lo que hay que tomar en cuenta) y el resultado esperado.
   Marcado: «rótulo de pantalla», `dato`, **negrita**, [[ruta|enlace al sistema]].
   ============================================================================ */
window.AREA = {
  id: 'pm',
  nombre: 'PM',
  corto: 'Antes de empezar',
  titulo: 'Pruebas de PM',
  sub: 'Tres pruebas por pantalla: qué hacer, qué tomar en cuenta y qué debe responder el sistema.',
  color: '#be185d',
  version: '2026-10-09',
  intro: [
    {
      tipo: 'aviso', tono: 'ok', titulo: 'Cómo se hace cada prueba',
      html: 'Escribe tu nombre arriba, abre el sistema en otra pestaña y haz lo que dice «Haz esto». Compara con «Debe pasar» y marca **Correcto**, **Falló**, **Resultado no óptimo** o **No aplica**. Si algo falla o no te convence, escribe en el comentario el mensaje que salió y el número del documento que usaste. Al terminar el día pulsa «Descargar reporte».'
    },
    {
      tipo: 'aviso', tono: 'atencion', titulo: 'En cada pantalla haces algo distinto',
      html: 'En **Proveedores, Compras y Reservas solo consultas**. En **Productos editas** (datos, precios, comisión e imágenes), pero no creas. En **Listas de precios pones precios**, pero no creas listas. En **Metas PM ves el avance de tu meta**, que te asigna el Director de PM. En **Órdenes de trabajo creas**, pero no procesas ni finalizas. Las pruebas con la etiqueta <span class="chip neg">Validación: el sistema debe impedirlo</span> comprueban que no aparezca lo que no te corresponde, y las de <span class="chip req">Lo hace: Director de PM</span> necesitan que otra persona haga ese paso.'
    },
    {
      tipo: 'aviso', tono: 'peligro', titulo: 'Lo que registres queda guardado',
      html: 'Las **ventas se transmiten a un ambiente de pruebas de Hacienda**: no tienen validez fiscal, pero sí bajan el inventario. Las líneas y promociones que crees **no las podrás corregir ni borrar** con tu usuario: usa los datos de prueba que indique el coordinador y nómbralos PRUEBA + tus iniciales.'
    }
  ],
  pantallas: [
    /* ============================================================== PROVEEDORES */
    {
      id: 'proveedores', codigo: 'PRV', titulo: 'Proveedores', corto: 'Proveedores', ruta: 'Generales → «Proveedores»', url: 'proveedores', color: '#475569',
      pruebas: [
        {
          id: 'PRV-01', titulo: 'Buscar un proveedor',
          pasos: [
            'Escribe parte del nombre o el NIT en «Buscar por nombre, codigo o documento...» y pulsa «Filtrar».'
          ],
          espera: [
            'El proveedor aparece con su «Codigo», «NIT / NRC», «Telefono» y «Estado».'
          ]
        },
        {
          id: 'PRV-02', titulo: 'Revisar su ficha y lo que se le ha comprado',
          pasos: [
            'Abre la ficha del proveedor, revisa «Contactos del proveedor» y «Resumen comercial», y pulsa «Compras».'
          ],
          espera: [
            'La ficha muestra sus contactos, «Total de compras» y «Monto acumulado», y «Compras» abre el histórico de lo que se le ha comprado.'
          ]
        },
        {
          id: 'PRV-03', titulo: 'Los proveedores no se registran desde PM', negativa: true,
          pasos: [
            'Busca en el listado y en la ficha los botones «Nuevo proveedor», «Crear contacto», «Editar» y «Eliminar».'
          ],
          espera: [
            'No aparece ninguno: tu usuario solo consulta proveedores (los registra Almacén).'
          ]
        }
      ]
    },
    /* ============================================================== LÍNEAS PM */
    {
      id: 'lineas', codigo: 'LIN', titulo: 'Líneas PM', corto: 'Líneas PM', ruta: 'Inventario → «Líneas PM»', url: 'lineas-pm', color: '#be185d',
      pruebas: [
        {
          id: 'LIN-01', titulo: 'Crear una línea a tu cargo',
          pasos: [
            'Pulsa «Nueva línea», llena «Nombre» (obligatorio) y un «Código», elige tu usuario en «Product Manager responsable» y pulsa «Guardar».'
          ],
          espera: [
            'Aviso verde de línea creada correctamente. La fila sale «Activa» y con tu nombre en «Product Manager».'
          ],
          nota: 'Con tu usuario no podrás renombrarla ni borrarla: nómbrala PRUEBA + tus iniciales.'
        },
        {
          id: 'LIN-02', titulo: 'Comprobar que el producto hereda el PM',
          para: 'Hazla después de PRO-01.',
          pasos: [
            'Abre la ficha de tu línea con el ícono de información y revisa «Productos de esta línea». Luego pulsa «Panel de asignaciones PM».'
          ],
          espera: [
            'La línea cuenta el producto de PRO-01, y en la ficha de ese producto «PM asignado» muestra tu nombre (si su marca y su categoría no tienen otro PM).',
            'El panel te lista con lo que administras.'
          ]
        },
        {
          id: 'LIN-03', titulo: 'Código repetido y edición bloqueada', negativa: true,
          pasos: [
            'Crea otra línea con el mismo «Código» de LIN-01.',
            'En la ficha de tu línea busca el botón «Editar línea y PM».'
          ],
          espera: [
            '«El valor de código ya está registrado.» y no se guarda.',
            'No aparecen el lápiz, la papelera ni «Editar línea y PM».'
          ]
        }
      ]
    },

    /* ============================================================== LISTAS DE PRECIOS */
    {
      id: 'listas', codigo: 'LPR', titulo: 'Listas de precios', corto: 'Listas de precios', ruta: 'Inventario → «Listas de precios»', url: 'listas-precios', color: '#b45309',
      pruebas: [
        {
          id: 'LPR-01', titulo: 'Consultar las listas de precios',
          pasos: [
            'Revisa en la tabla el «Nombre de la lista», «IVA», «Activa», «Clientes» y «Precios» de cada una.'
          ],
          espera: [
            'Ves todas las listas, con cuántos clientes y cuántos productos con precio tiene cada una.'
          ]
        },
        {
          id: 'LPR-02', titulo: 'Poner el precio de un producto en una lista',
          pasos: [
            'En la ficha de un producto a tu cargo, en «Precios por lista de precios», escribe el «c/IVA» de una lista y pulsa «Guardar precios».',
            'Abre «Catálogos de productos» y despliega «Categoría de precio».'
          ],
          espera: [
            'El precio queda guardado en esa lista.',
            'El catálogo ofrece las mismas listas activas que ves en esta pantalla.'
          ]
        },
        {
          id: 'LPR-03', titulo: 'Las listas no se crean ni se modifican desde PM', negativa: true,
          pasos: [
            'Busca el formulario «Nueva lista de precios» con su botón «Crear lista», e intenta cambiar el nombre de una lista existente.'
          ],
          espera: [
            'No aparece el formulario y los campos de la tabla están deshabilitados: tu usuario pone precios en las listas, pero no crea ni modifica listas.'
          ]
        }
      ]
    },
    /* ============================================================== PRODUCTOS */
    {
      id: 'productos', codigo: 'PRO', titulo: 'Productos / Servicios', corto: 'Productos / Servicios', ruta: 'Inventario → «Productos / Servicios»', url: 'productos', color: '#0c6a66',
      pruebas: [
        {
          id: 'PRO-01', titulo: 'Editar los datos y la imagen de un producto',
          pasos: [
            'Abre un producto a tu cargo y pulsa «Editar». Cambia «Descripción corta», elige tu línea en «Línea PM», sube una «Imagen del producto» y pulsa «Guardar producto».'
          ],
          espera: [
            'Aviso verde de producto actualizado correctamente. La ficha muestra la descripción, la línea y la imagen nuevas.'
          ],
          nota: 'Usa el producto de prueba que indique el coordinador y anota su código: se usa en las pruebas siguientes.'
        },
        {
          id: 'PRO-02', titulo: 'Cambiar el precio y la comisión',
          pasos: [
            'En la ficha del producto, en «Precios por lista de precios», escribe un precio nuevo en «c/IVA» y un monto en «Comisión» para una lista, y pulsa «Guardar precios».'
          ],
          espera: [
            'El precio sin IVA se recalcula solo (c/IVA ÷ 1.13) y sale el aviso de precios actualizados correctamente.',
            'El cambio queda registrado en la pestaña «Histórico de precios/costos».'
          ],
          nota: 'Anota en el comentario el precio que tenía antes, para dejarlo igual al terminar.'
        },
        {
          id: 'PRO-03', titulo: 'Precio bajo el costo y alta de productos', negativa: true,
          pasos: [
            'En «Precios por lista de precios» baja el «c/IVA» de una lista hasta dejarlo por debajo del costo e intenta guardar.',
            'En el listado busca el botón «Nuevo producto».'
          ],
          espera: [
            'No deja guardar: avisa «No se podrán guardar los precios hasta corregir:» y explica la utilidad mínima de esa lista.',
            'No aparece «Nuevo producto»: los productos y servicios los crea Almacén.'
          ]
        }
      ]
    },
    /* ============================================================== CATÁLOGOS DE PRODUCTOS */
    {
      id: 'catalogos', codigo: 'CAT', titulo: 'Catálogos de productos', corto: 'Catálogos de productos', ruta: 'Inventario → «Catálogos de productos»', url: 'catalogos-productos', color: '#7c3aed',
      pruebas: [
        {
          id: 'CAT-01', titulo: 'Generar un catálogo en PDF',
          pasos: [
            'Elige una lista en «Categoría de precio» (obligatoria), añade 3 productos con el botón + y pulsa «Vista previa e imprimir PDF».'
          ],
          espera: [
            'El PDF se abre en otra pestaña con los 3 productos, en el orden de «Mi catálogo» y con el precio de la lista elegida.'
          ]
        },
        {
          id: 'CAT-02', titulo: 'Filtrar productos y cambiar de lista',
          pasos: [
            'Elige «Solo con existencia» en «Disponibilidad» y pulsa «Aplicar filtros». Luego cambia «Categoría de precio» a otra lista.'
          ],
          espera: [
            'Solo quedan productos con existencia. Al cambiar de lista los precios se recalculan, y el producto sin precio en esa lista dice «Consultar precio».'
          ]
        },
        {
          id: 'CAT-03', titulo: 'Catálogo vacío o sin lista', negativa: true,
          pasos: [
            'Pulsa «Descargar PDF» con «Mi catálogo» vacío.',
            'Añade un producto, deja «Categoría de precio» sin elegir y pulsa otra vez.'
          ],
          espera: [
            '«Añada al menos un producto antes de generar el PDF.».',
            '«Seleccione la categoría de precio que se publicará.».'
          ]
        }
      ]
    },

    /* ============================================================== COMISIONES */
    {
      id: 'comisiones', codigo: 'CMS', titulo: 'Comisiones', corto: 'Comisiones', ruta: 'Inventario → «Comisiones»', url: 'comisiones', color: '#0d9488',
      pruebas: [
        {
          id: 'CMS-01', titulo: 'Ver la comisión de un producto',
          para: 'Hazla después de PRO-02.',
          pasos: [
            'Busca el producto de PRO-02 en «Producto, código o UPC...», pulsa «Filtrar» y abre «Detalle».'
          ],
          espera: [
            'El producto sale marcado con comisión, y el detalle muestra en esa lista el monto que guardaste.'
          ]
        },
        {
          id: 'CMS-02', titulo: 'Filtrar con y sin comisión',
          pasos: [
            'Filtra con «Solo CON comisión» y después con «Solo SIN comisión».'
          ],
          espera: [
            'Cada filtro deja solo los productos que corresponden, y coinciden con las tarjetas «Con comisión (en alguna lista)» y «Sin comisión (en ninguna)».'
          ]
        },
        {
          id: 'CMS-03', titulo: 'Ir del detalle a cambiar la comisión',
          pasos: [
            'En «Detalle» pulsa «Abrir el producto para editarla».'
          ],
          espera: [
            'Abre la ficha del producto, donde sí puedes cambiar la comisión y guardarla (PRO-02). En la pantalla de comisiones no se edita nada: es solo de consulta.'
          ]
        }
      ]
    },

    /* ============================================================== PROMOCIONES */
    {
      id: 'promociones', codigo: 'PRM', titulo: 'Promociones', corto: 'Promociones', ruta: 'Inventario → «Promociones»', url: 'promociones', color: '#c2410c',
      pruebas: [
        {
          id: 'PRM-01', titulo: 'Crear una promoción',
          pasos: [
            'Pulsa «Nueva promoción», llena «Nombre», «Porcentaje general» = 10, «Inicio» (hoy) y «Fin» (obligatorios).',
            'En «Agregar artículos al listado» agrega el producto de PRO-01 y pulsa «Guardar promoción».'
          ],
          espera: [
            'Aviso verde de promoción creada correctamente. La fila sale «Vigente», con tu producto en «Aplica a».'
          ],
          nota: 'Con tu usuario no se puede desactivar después: pon en «Fin» una fecha cercana.'
        },
        {
          id: 'PRM-02', titulo: 'Ver la promoción en el producto y en la venta',
          pasos: [
            'Abre la ficha del producto y busca «Producto con promoción».',
            'En «Nueva venta» elige un cliente, agrega el producto y revisa la línea. No hace falta emitir: pulsa «Cancelar».'
          ],
          espera: [
            'La ficha muestra la vigencia de la promoción.',
            'En la venta, la línea ofrece una casilla de promoción con el 10% de ahorro; no se aplica sola, hay que marcarla.'
          ]
        },
        {
          id: 'PRM-03', titulo: 'Un producto no va en dos promociones', negativa: true,
          pasos: [
            'Crea otra promoción activa con el mismo producto y fechas que se crucen con la de PRM-01.'
          ],
          espera: [
            'No se guarda: avisa que un producto no puede estar en dos promociones a la vez.',
            'En el listado no hay lápiz ni papelera.'
          ]
        }
      ]
    },

    /* ============================================================== COMPRAS */
    {
      id: 'compras', codigo: 'COM', titulo: 'Compras', corto: 'Compras / NC', ruta: 'Inventario → «Compras / NC»', url: 'compras', color: '#0c6a66',
      pruebas: [
        {
          id: 'COM-01', titulo: 'Buscar una compra',
          pasos: [
            'Escribe el proveedor o el número en «Documento, codigo o proveedor...», elige un estado en «Todos los estados» y pulsa «Filtrar».'
          ],
          espera: [
            'Quedan solo las compras que cumplen, con su «Documento», «Proveedor», «Fecha», «Origen», «Total» y «Estado».'
          ]
        },
        {
          id: 'COM-02', titulo: 'Revisar una compra y sus notas de crédito',
          pasos: [
            'Abre una compra con «Ver» y revisa sus productos, totales y «Validez fiscal».',
            'Pulsa «Notas de credito» y abre una nota.'
          ],
          espera: [
            'La compra muestra cada producto con su cantidad y precio.',
            'Las notas de crédito indican su «Concepto», «Monto» y «Estado».'
          ]
        },
        {
          id: 'COM-03', titulo: 'Las compras no se ingresan desde PM', negativa: true,
          pasos: [
            'Busca los botones «Nueva compra» en el listado de compras y «Nueva nota» en el de notas de crédito. En la ficha de una compra busca «Completar» y «Anular».'
          ],
          espera: [
            'No aparece ninguno: tu usuario solo consulta las compras y sus notas de crédito (las ingresa Almacén).'
          ]
        }
      ]
    },
    /* ============================================================== KARDEX */
    {
      id: 'kardex', codigo: 'KAR', titulo: 'Kardex', corto: 'Kardex', ruta: 'Inventario → «Kardex»', url: 'kardex', color: '#1c58ad',
      pruebas: [
        {
          id: 'KAR-01', titulo: 'Consultar el historial de un producto',
          pasos: [
            'En «Producto» escribe 2 letras o más, **elige el producto de la lista** y pulsa «Consultar».'
          ],
          espera: [
            'Los movimientos salen del más reciente al más antiguo. El «Saldo» de la primera fila es igual al «Stock global» y solo aparecen bodegas de tu sucursal.'
          ]
        },
        {
          id: 'KAR-02', titulo: 'Ubicar las compras y ventas de un producto',
          pasos: [
            'Consulta un producto a tu cargo que tenga movimiento y ubica una fila de compra y una de venta.'
          ],
          espera: [
            'La compra sale como «Entrada» y la venta como salida, cada una con su documento, y «Existencias por sucursal y bodega» coincide con el último «Saldo».'
          ]
        },
        {
          id: 'KAR-03', titulo: 'Producto sin elegir y servicio', negativa: true,
          pasos: [
            'Pulsa «Consultar» con un nombre escrito pero sin elegirlo de la lista.',
            'Después consulta un servicio.'
          ],
          espera: [
            '«Seleccione un producto de la lista de busqueda.».',
            'El servicio muestra «Seguimiento de servicio» en lugar de movimientos.'
          ]
        }
      ]
    },

    /* ============================================================== METAS PM */
    {
      id: 'metas', codigo: 'MTA', titulo: 'Metas PM', corto: 'Metas PM', ruta: 'Inventario → «Metas PM» · «Asignación de Metas PM»', url: 'metas-pm/dashboard', color: '#be185d',
      pruebas: [
        {
          id: 'MTA-01', titulo: 'El Director de PM te asigna la meta del mes', requiere: 'Director de PM',
          pasos: [
            'El Director de PM entra a «Asignación de Metas PM», pulsa «Nueva meta PM», te elige en «Product Manager», escribe «Meta de ventas ($)» = 5000 (obligatorio) y pulsa «Guardar».'
          ],
          espera: [
            '«Meta PM #… creada correctamente.». La fila sale «Activa», con tu nombre y el mes actual en «Periodo».'
          ],
          nota: 'Si «Mes» tiene valor, la meta toma ese mes completo aunque se cambien las fechas.'
        },
        {
          id: 'MTA-02', titulo: 'Ver el avance de tu meta',
          para: 'Hazla después de MTA-01.',
          pasos: [
            'Entra a Inventario → «Metas PM».'
          ],
          espera: [
            '«Cumplimiento de Meta» muestra la meta de $5,000.00 que te puso el Director, con tus ventas y compras del periodo.',
            'Solo ves tus datos: no hay filtro para elegir otro PM.'
          ]
        },
        {
          id: 'MTA-03', titulo: 'Las metas no se asignan desde PM', negativa: true,
          pasos: [
            'Entra a «Asignación de Metas PM» y busca «Nueva meta PM», «Copiar», el lápiz y la papelera.'
          ],
          espera: [
            'No aparece ninguno, y solo se lista tu propia meta: las metas las pone el Director de PM.'
          ]
        }
      ]
    },
    /* ============================================================== RESERVAS */
    {
      id: 'reservas', codigo: 'RES', titulo: 'Reservas de producto', corto: 'Reservas', ruta: 'Inventario → «Reservas»', url: 'reservas', color: '#7c3aed',
      pruebas: [
        {
          id: 'RES-01', titulo: 'Buscar reservas',
          pasos: [
            'Filtra el listado por «Estado» y por «Vendedor», o escribe un cliente o un producto en «Busqueda», y pulsa «Filtrar».'
          ],
          espera: [
            'Quedan solo las reservas que cumplen, y las vencidas se distinguen en rojo.'
          ]
        },
        {
          id: 'RES-02', titulo: 'Revisar una reserva',
          pasos: [
            'Abre una reserva con el icono del ojo.'
          ],
          espera: [
            'Muestra el cliente, quién la solicitó, la «Fecha estimada» y cada producto con su cantidad, sus bodegas y su estado.'
          ]
        },
        {
          id: 'RES-03', titulo: 'Las reservas no se crean ni se liberan desde PM', negativa: true,
          pasos: [
            'Busca el botón «Nueva reserva» en el listado y «Liberar reserva» dentro de una reserva activa.'
          ],
          espera: [
            'No aparece ninguno: tu usuario solo consulta reservas.'
          ]
        }
      ]
    },
    /* ============================================================== ÓRDENES DE TRABAJO */
    {
      id: 'ordenes', codigo: 'OT', titulo: 'Órdenes de trabajo', corto: 'Órdenes de trabajo', ruta: 'Inventario → «Órdenes de trabajo»', url: 'ordenes-trabajo', color: '#0d9488',
      pruebas: [
        {
          id: 'OT-01', titulo: 'Crear una orden',
          pasos: [
            'Pulsa «Nueva orden», llena «Cliente», «Tipo de requerimiento» y «Especificacion del trabajo» (obligatorios), escribe DTE-PRUEBA-01 en «Numero DTE asociado», agrega un producto y pulsa «Guardar orden».'
          ],
          espera: [
            'Se crea con número OT-… e insignia «Solicitud». No mueve inventario.'
          ],
          nota: 'Anota el número de la orden: se usa en OT-02 y OT-03.'
        },
        {
          id: 'OT-02', titulo: 'Buscar y filtrar órdenes',
          pasos: [
            'En «Numero, cliente o DTE...» busca la orden de OT-01 por su número, por el cliente y por DTE-PRUEBA. Prueba la tarjeta «Solicitadas» y «Limpiar».'
          ],
          espera: [
            'La orden aparece en las tres búsquedas y solo ves órdenes de tu sucursal.'
          ]
        },
        {
          id: 'OT-03', titulo: 'La orden no se procesa desde PM', negativa: true,
          pasos: [
            'Abre la orden de OT-01 y busca los botones «Marcar procesado», «Finalizar», «Editar» y «Anular».'
          ],
          espera: [
            'No aparece ninguno: tu usuario crea y consulta órdenes, pero no las procesa ni las finaliza.',
            'Cuando el técnico la avance, tú solo ves el cambio a «Procesado» y luego a «Finalizado».'
          ]
        }
      ]
    },

    /* ============================================================== COTIZACIONES */
    {
      id: 'cotizaciones', codigo: 'COT', titulo: 'Cotizaciones', corto: 'Cotizaciones', ruta: 'Facturación → «Cotizaciones»', url: 'cotizaciones', color: '#2563eb',
      pruebas: [
        {
          id: 'COT-01', titulo: 'Crear una cotización',
          pasos: [
            'Pulsa «Nueva cotización» y elige «Cliente» (obligatorio). Agrega un producto con «Buscar producto del catalogo...» y un «Item libre» con nombre, cantidad y precio, y pulsa «Guardar cotizacion».'
          ],
          espera: [
            'Se crea con número COT-… y estado «Pendiente».',
            'En el producto de catálogo, «Precio unit.» viene de la lista de precios del cliente y no se puede cambiar.'
          ],
          nota: 'Si el cliente no tiene lista de precios, el producto sale en $0.00: usa un cliente que sí la tenga.'
        },
        {
          id: 'COT-02', titulo: 'Sacar el PDF y buscar la cotización',
          pasos: [
            'En el detalle pulsa «PDF». En el listado búscala con «Número o cliente...» y filtra por el estado «Pendiente».'
          ],
          espera: [
            'El PDF abre con el cliente, los ítems y las «CONDICIONES DE LA OFERTA:».',
            'La cotización aparece en la búsqueda, con tu nombre en «Vendedor».'
          ]
        },
        {
          id: 'COT-03', titulo: 'Convertirla en venta',
          pasos: [
            'En tu cotización pulsa «Facturar (convertir a venta)» y emite la venta sin cambiar el cliente ni el tipo de documento.',
            'Vuelve a abrir tu cotización. Luego abre una creada por otro usuario.'
          ],
          espera: [
            'La venta abre con el cliente y el producto de catálogo ya cargados (el ítem libre no pasa), y al emitir la cotización queda «Facturada».',
            'En la tuya no hay «Editar» ni «Anular», y en la ajena no aparece «Facturar (convertir a venta)».'
          ]
        }
      ]
    },

    /* ============================================================== NUEVA VENTA */
    {
      id: 'venta', codigo: 'VEN', titulo: 'Nueva venta', corto: 'Nueva venta', ruta: 'Facturación → «Nueva venta»', url: 'ventas/create', color: '#b0342a',
      pruebas: [
        {
          id: 'VEN-01', titulo: 'Emitir una factura de contado',
          para: 'La venta se transmite al ambiente de pruebas de Hacienda (sin validez fiscal), pero sí baja el inventario: usa un producto con existencia.',
          pasos: [
            'Elige «Cliente», «Tipo de documento» (factura), «Bodega de descarga» y «Forma de pago» de contado (obligatorios), y agrega un producto con «Cantidad» 1.',
            'Pulsa «Emitir DTE (queda pendiente de transmisión)» y revisa el producto en «Kardex».'
          ],
          espera: [
            'Abre el «Detalle del DTE» con el aviso de descarga de inventario exitosa y el estado «Pendiente» o «Transmitida».',
            'En Kardex hay una salida por 1 unidad con el número del documento.'
          ],
          nota: 'Anota el número de control: se usa en DTE-01.'
        },
        {
          id: 'VEN-02', titulo: 'Documento y forma de pago según el cliente', negativa: true,
          pasos: [
            'Elige un cliente sin NIT ni NRC y cambia «Tipo de documento» a crédito fiscal. Revisa qué ofrece «Forma de pago». No hace falta emitir: pulsa «Cancelar».'
          ],
          espera: [
            '«El cliente seleccionado no tiene NIT/NRC registrados: no puede emitirse Crédito Fiscal.».',
            'El crédito solo aparece si el cliente lo tiene autorizado, y el «Precio unitario» no se puede editar.'
          ]
        },
        {
          id: 'VEN-03', titulo: 'Vender más de lo que hay', negativa: true,
          pasos: [
            'Agrega un producto con una «Cantidad» muy superior a su existencia (por ejemplo 9999) y pulsa «Emitir DTE (queda pendiente de transmisión)».'
          ],
          espera: [
            'Avisa «Stock insuficiente…» con lo disponible y lo solicitado, la línea se marca en rojo y no se crea ningún documento.'
          ]
        }
      ]
    },

    /* ============================================================== CONSULTAS DTE */
    {
      id: 'dte', codigo: 'DTE', titulo: 'Documentos DTE, remisiones, retornos e invalidaciones', corto: 'Consultas de documentos', ruta: 'Facturación → «Documentos DTE» · «Notas de crédito» · «Notas de remisión» · «Eventos de retorno» · «Invalidaciones»', url: 'ventas', color: '#1c58ad',
      pruebas: [
        {
          id: 'DTE-01', titulo: 'Buscar un documento y abrir su detalle',
          pasos: [
            'En «Documentos DTE» busca el documento de VEN-01 (u otro de tu sucursal) y ábrelo con «Ver detalle». Pulsa «PDF / Imprimir DTE».'
          ],
          espera: [
            'Solo salen documentos de tu sucursal, y el detalle muestra productos, totales y estado.',
            '«PDF / Imprimir DTE», «Imprimir ticket» y «JSON DTE» dan «Acceso no autorizado»; no aparecen «Invalidar» ni «Nota de crédito».'
          ]
        },
        {
          id: 'DTE-02', titulo: 'Dejar un comentario de entrega para el rutero',
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
    },

    /* ============================================================== RUTAS */
    {
      id: 'rutas', codigo: 'RUT', titulo: 'Gestiones y documentos pendientes de ruta', corto: 'Rutas', ruta: 'Rutas → «Gestiones» · «Consulta de gestiones» · «Documentos pendientes»', url: 'rutas-gestiones', color: '#0d9488',
      pruebas: [
        {
          id: 'RUT-01', titulo: 'Registrar una gestión',
          pasos: [
            'Pulsa «Nueva gestión» y llena los obligatorios: «Tipo de persona», «Cliente» (o «Proveedor»), «Lugar de gestión», «Tipo de gestión», «Prioridad», «Descripción», «Área que envía», «Lugar de ruta» y «Fecha».',
            'Según el «Tipo de gestión» aparecen campos extra (documento, monto, producto o serie): llénalos y pulsa «Guardar gestión».'
          ],
          espera: [
            '«Gestión registrada. Queda pendiente de asignar a una hoja de ruta.» y queda «Pendiente».',
            'Con tu usuario no aparecen «Editar» ni «Cancelar gestión».'
          ]
        },
        {
          id: 'RUT-02', titulo: 'Buscar gestiones y ver su avance',
          pasos: [
            'En «Gestiones» busca la de RUT-01 por cliente y por estado Pendiente. Después búscala en «Consulta avanzada» por «N.º documento» o por monto.'
          ],
          espera: [
            'La gestión aparece «Pendiente» y los indicadores de arriba cambian con el filtro. En la fila solo hay el ojo «Ver».'
          ]
        },
        {
          id: 'RUT-03', titulo: 'Ver las ventas pendientes de ruta',
          pasos: [
            'En «Documentos pendientes» filtra por cliente o por ruta, mira la columna «Despacho de bodega» y pulsa «Ver» en una fila.'
          ],
          espera: [
            'Solo aparecen ventas con ruta, marcadas «Sin despachar» o «Despachado», y «Ver» abre el «Detalle del DTE».',
            'No hay casillas ni «Asignar a la hoja de ruta»: eso lo hace el área de Rutas.'
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
          id: 'ACT-02', titulo: 'Aprobar la solicitud', requiere: 'Supervisor (José Omar Salinas)',
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
