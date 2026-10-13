/* ============================================================================
   Checklist de pruebas · Área: Ventas · DSIN ERP
   Tres pruebas por pantalla, cada una en una o dos líneas: qué hacer (con los
   datos obligatorios y lo que hay que tomar en cuenta) y el resultado esperado.
   Marcado: «rótulo de pantalla», `dato`, **negrita**, [[ruta|enlace al sistema]].
   ============================================================================ */
window.AREA = {
  id: 'ventas',
  nombre: 'Ventas',
  corto: 'Antes de empezar',
  titulo: 'Pruebas de Ventas',
  sub: 'Tres pruebas por pantalla: qué hacer, qué tomar en cuenta y qué debe responder el sistema.',
  color: '#2563eb',
  version: '2026-10-09',
  intro: [
    {
      tipo: 'aviso', tono: 'ok', titulo: 'Cómo se hace cada prueba',
      html: 'Escribe tu nombre arriba, abre el sistema en otra pestaña y haz lo que dice «Haz esto». Compara con «Debe pasar» y marca **Correcto**, **Falló**, **Resultado no óptimo** o **No aplica**. Si algo falla o no te convence, escribe en el comentario el mensaje que salió y el número del documento que usaste. Al terminar el día pulsa «Descargar reporte».'
    },
    {
      tipo: 'aviso', tono: 'atencion', titulo: 'En cada pantalla haces algo distinto',
      html: '**Creas** clientes, cotizaciones, ventas, reservas, órdenes de trabajo y gestiones de ruta. En **Productos, Combos, Promociones, Promocionales, Comisiones y Kardex solo consultas**. Tu **meta la asigna tu jefatura** y tú ves el avance: esa prueba lleva la etiqueta <span class="chip req">Lo hace: Jefatura de Ventas</span>. Las pruebas de <span class="chip neg">Validación: el sistema debe impedirlo</span> comprueban que no aparezca lo que no te corresponde.'
    },
    {
      tipo: 'aviso', tono: 'peligro', titulo: 'Lo que registres queda guardado',
      html: 'Las **ventas se transmiten a un ambiente de pruebas de Hacienda** (sin validez fiscal), pero sí bajan el inventario. Una **reserva aparta el producto** y con tu usuario no la puedes liberar: reserva pocas unidades y avisa al coordinador para que la liberen. Usa los clientes y productos de prueba que te indiquen.'
    }
  ],
  pantallas: [
    /* ============================================================== CLIENTES */
    {
      id: 'clientes', codigo: 'CLI', titulo: 'Clientes', corto: 'Clientes', ruta: 'Generales → «Clientes»', url: 'clientes', color: '#2563eb',
      pruebas: [
        {
          id: 'CLI-01', titulo: 'Registrar un cliente',
          pasos: [
            'Pulsa «Nuevo cliente», llena «Nombre / Razon social» (obligatorio), su NIT o DUI, el NRC si es contribuyente y la «Categoria (lista de precios)», y pulsa «Guardar cliente».'
          ],
          espera: [
            '«Cliente … creado correctamente.». Aparece en el listado con su código generado solo y se puede elegir en «Nueva venta» y en una cotización.'
          ]
        },
        {
          id: 'CLI-02', titulo: 'Revisar la ficha y sus documentos',
          pasos: [
            'Abre la ficha de un cliente con ventas, revisa «Ultimos documentos emitidos» y pulsa «Ver historico».',
            'Con «Nuevo contacto» agrega un contacto llenando «Nombre», «Telefono», «Correo» y «Cargo» (obligatorios).'
          ],
          espera: [
            'Se listan sus documentos con fecha, total y estado.',
            '«Contacto agregado correctamente.».'
          ]
        },
        {
          id: 'CLI-03', titulo: 'Nombre repetido y NIT inválido', negativa: true,
          pasos: [
            'Intenta guardar un cliente con el mismo nombre de CLI-01, y otro con un NIT inventado.'
          ],
          espera: [
            'Avisa que ya existe un cliente con un nombre muy parecido, y que el NIT no es válido porque el dígito verificador no corresponde.',
            'En la ficha y en el listado no aparecen «Editar» ni «Eliminar».'
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

    /* ============================================================== PROMOCIONES */
    {
      id: 'promociones', codigo: 'PRM', titulo: 'Promociones', corto: 'Promociones', ruta: 'Inventario → «Promociones»', url: 'promociones', color: '#c2410c',
      pruebas: [
        {
          id: 'PRM-01', titulo: 'Consultar las promociones vigentes',
          pasos: [
            'Elige «Solo vigentes» en «Cualquier vigencia» y pulsa «Filtrar».'
          ],
          espera: [
            'Quedan solo las promociones con estado «Vigente», cada una con a qué aplica, su descuento y su vigencia.'
          ]
        },
        {
          id: 'PRM-02', titulo: 'Aplicar una promoción en la venta',
          pasos: [
            'En «Nueva venta» elige un cliente, agrega un producto con promoción vigente y marca la casilla de promoción de su línea. No hace falta emitir: pulsa «Cancelar».'
          ],
          espera: [
            'La promoción no se aplica sola: al marcarla, el ahorro pasa a «Desc. unitario» y baja el «Total a pagar».',
            'El «Precio unitario» no se puede editar.'
          ]
        },
        {
          id: 'PRM-03', titulo: 'Las promociones no se crean desde Ventas', negativa: true,
          pasos: [
            'Busca el botón «Nueva promoción», el lápiz y la papelera en el listado.'
          ],
          espera: [
            'No aparece ninguno: las promociones las crea PM y tú solo las consultas y las aplicas.'
          ]
        }
      ]
    },

    /* ============================================================== PROMOCIONALES */
    {
      id: 'promocionales', codigo: 'PRL', titulo: 'Promocionales (artículos de regalo)', corto: 'Promocionales', ruta: 'Inventario → «Promocionales»', url: 'promocionales', color: '#be185d',
      pruebas: [
        {
          id: 'PRL-01', titulo: 'Consultar un promocional y sus reglas',
          pasos: [
            'Busca un promocional con «Nombre o código...», pulsa «Filtrar» y abre su ficha con el ojo.'
          ],
          espera: [
            'La ficha muestra «Reglas de entrega en la facturación» (cuándo se regala) y «Existencias por sucursal».'
          ]
        },
        {
          id: 'PRL-02', titulo: 'Entregar un promocional en una venta',
          para: 'Necesita un promocional activo, con regla y con existencia en tu sucursal.',
          pasos: [
            'En «Nueva venta» arma una venta que cumpla la regla del promocional, revisa la tarjeta «Promocional de regalo» y emite.',
            'Abre el detalle de la venta y la ficha del promocional.'
          ],
          espera: [
            'El promocional se marca solo al cumplirse la regla, y solo se puede llevar uno por factura.',
            'La venta muestra «Promocionales entregados» y la existencia del promocional en tu sucursal baja.'
          ]
        },
        {
          id: 'PRL-03', titulo: 'Los promocionales no se administran desde Ventas', negativa: true,
          pasos: [
            'Busca «Nuevo promocional» en el listado, y en una ficha busca «Editar», «Agregar regla» y «Registrar movimiento».'
          ],
          espera: [
            'No aparece ninguno: tu usuario consulta los promocionales y los entrega en la venta.'
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

    /* ============================================================== RESERVAS */
    {
      id: 'reservas', codigo: 'RES', titulo: 'Reservas de producto', corto: 'Reservas', ruta: 'Inventario → «Reservas»', url: 'reservas', color: '#7c3aed',
      pruebas: [
        {
          id: 'RES-01', titulo: 'Crear una reserva',
          pasos: [
            'Pulsa «Nueva reserva», llena «Solicitado por» (el vendedor que la pide) y «Fecha estimada» (obligatorios), elige el cliente y agrega un producto con «Cantidad» 1.',
            'Revisa que «Bodega origen» y «Bodega reserva» vengan elegidas y pulsa «Guardar reserva».'
          ],
          espera: [
            '«Reserva #N creada.» y queda «Activa».',
            'En Kardex la bodega origen baja 1, la de reserva sube 1 y el «Stock global» no cambia.'
          ],
          nota: 'Anota el número: avisa al coordinador para que la liberen al terminar. Si «Bodega reserva» viene vacía, márcalo como Falló.'
        },
        {
          id: 'RES-02', titulo: 'Reservas que el sistema no debe aceptar', negativa: true,
          pasos: [
            'Intenta guardar una reserva con «Cantidad» mayor a la existencia y otra con «Fecha estimada» de ayer; luego intenta agregar un servicio.'
          ],
          espera: [
            'Ninguna se crea: avisa «Stock insuficiente…», «La fecha aproximada de liberacion o facturacion no puede ser anterior a hoy.» y «Los servicios no se pueden reservar en inventario.».'
          ]
        },
        {
          id: 'RES-03', titulo: 'Buscar la reserva; liberarla no es de Ventas', negativa: true,
          pasos: [
            'Filtra el listado por «Estado» y por «Vendedor» y abre la reserva de RES-01. Busca el botón «Liberar reserva».'
          ],
          espera: [
            'La reserva aparece «Activa» con su producto en estado «Reservado».',
            'No aparece «Liberar reserva»: la libera otro rol, y mientras tanto esa unidad no se puede vender.'
          ]
        }
      ]
    },

    /* ============================================================== REPORTES DE RESERVAS */
    {
      id: 'reportes-reservas', codigo: 'RRE', titulo: 'Reportes de reservas', corto: 'Reportes de reservas', ruta: 'Inventario → «Reservas vencidas» · «Productos en reserva» · «Reservas por usuario» · «Reporte reservas»', url: 'reservas/productos', color: '#475569',
      pruebas: [
        {
          id: 'RRE-01', titulo: 'Ver lo que está reservado y lo vencido',
          para: 'Hazla después de RES-01.',
          pasos: [
            'Abre «Productos en reserva» y busca el producto de RES-01. Luego abre «Reservas vencidas».'
          ],
          espera: [
            'El producto aparece con su cantidad, su «Bodega reserva» y su fecha estimada.',
            'En vencidas solo salen reservas con la fecha estimada pasada, con sus «Dias vencidos».'
          ]
        },
        {
          id: 'RRE-02', titulo: 'Exportar el reporte de reservas',
          pasos: [
            'En «Reporte reservas» busca tu usuario en «Usuario que creo», y pulsa «Excel» y después «PDF».'
          ],
          espera: [
            'Se descarga el Excel y se abre el PDF, con las mismas filas que ves en pantalla.'
          ]
        },
        {
          id: 'RRE-03', titulo: 'Reservas por usuario',
          pasos: [
            'Abre «Reservas por usuario» y filtra por un vendedor.'
          ],
          espera: [
            'Lista las reservas que pidió ese vendedor, de todos los estados, con cliente, producto y cantidad.',
            'Solo ves reservas de tu sucursal.'
          ]
        }
      ]
    },

    /* ============================================================== METAS */
    {
      id: 'metas', codigo: 'MET', titulo: 'Metas comerciales', corto: 'Metas', ruta: 'Facturación → «METAS» · «Metas comerciales»', url: 'metas/dashboard', color: '#0d9488',
      pruebas: [
        {
          id: 'MET-01', titulo: 'Tu jefatura te asigna la meta del mes', requiere: 'Jefatura de Ventas',
          pasos: [
            'La jefatura entra a «Metas comerciales», pulsa «Nueva meta», te elige en «Usuario», escribe «Meta venta» = 5000 y deja las fechas del mes (obligatorios), y pulsa «Guardar».'
          ],
          espera: [
            'Aviso verde de meta creada correctamente. La fila sale «Activa», con tu nombre y el mes en «Periodo».'
          ]
        },
        {
          id: 'MET-02', titulo: 'Ver el avance de tu meta',
          para: 'Hazla después de MET-01 y de emitir una venta (VEN-01).',
          pasos: [
            'Entra a Facturación → «METAS».'
          ],
          espera: [
            '«Cumplimiento de Meta» muestra tu meta de $5,000.00 y lo que llevas vendido.',
            '«Ventas Totales» y «Total Facturas» incluyen la venta de VEN-01. Solo ves tus propias ventas.'
          ]
        },
        {
          id: 'MET-03', titulo: 'La meta no se la pone el vendedor', negativa: true,
          pasos: [
            'Entra a «Metas comerciales» y busca «Nueva meta», «Copiar», el lápiz y la papelera.'
          ],
          espera: [
            'No aparece ninguno, y solo se lista tu propia meta: las metas las asigna la jefatura.'
          ]
        }
      ]
    },

    /* ============================================================== PRODUCTOS */
    {
      id: 'productos', codigo: 'PRO', titulo: 'Productos / Servicios', corto: 'Productos / Servicios', ruta: 'Inventario → «Productos / Servicios»', url: 'productos', color: '#0c6a66',
      pruebas: [
        {
          id: 'PRO-01', titulo: 'Buscar un producto',
          pasos: [
            'Escribe parte del nombre o el código en «Buscar por nombre, código, UPC o modelo...» y pulsa «Filtrar».'
          ],
          espera: [
            'El producto aparece con su código, categoría, estado y existencia.'
          ]
        },
        {
          id: 'PRO-02', titulo: 'Revisar su ficha',
          pasos: [
            'Abre la ficha del producto y recorre las pestañas «Existencias» y «Kardex».'
          ],
          espera: [
            'La ficha muestra su garantía y sus precios; «Existencias» una fila por bodega; y «Kardex» cada entrada y salida.'
          ]
        },
        {
          id: 'PRO-03', titulo: 'Los productos no se crean ni se editan desde Ventas', negativa: true,
          pasos: [
            'Busca el botón «Nuevo producto» y pulsa el lápiz de cualquier producto.'
          ],
          espera: [
            'No aparece «Nuevo producto», y el lápiz no deja editar: tu usuario solo consulta productos.'
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

    /* ============================================================== COMBOS */
    {
      id: 'combos', codigo: 'CBO', titulo: 'Combos', corto: 'Combos', ruta: 'Inventario → «Combos»', url: 'combos', color: '#be185d',
      pruebas: [
        {
          id: 'CBO-01', titulo: 'Consultar un combo',
          pasos: [
            'Busca un combo en «Buscar combo...», pulsa «Filtrar» y ábrelo con el ojo.'
          ],
          espera: [
            'Muestra sus «Componentes» con la cantidad de cada uno y sus «Precios por lista».'
          ]
        },
        {
          id: 'CBO-02', titulo: 'Ver el combo en una venta',
          pasos: [
            'En «Nueva venta» elige un cliente y agrega un combo. No hace falta emitir: pulsa «Cancelar».'
          ],
          espera: [
            'El combo entra como una sola línea con su nombre y su precio.'
          ]
        },
        {
          id: 'CBO-03', titulo: 'Los combos no se editan desde Ventas', negativa: true,
          pasos: [
            'En la ficha de un combo busca los botones «Editar» e «Historial de precios».'
          ],
          espera: [
            'No aparecen, y el costo del combo se muestra como restringido.'
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
          pasos: [
            'Busca un producto en «Producto, código o UPC...», pulsa «Filtrar» y abre «Detalle».'
          ],
          espera: [
            'El detalle muestra la comisión por unidad en cada lista de precios, o «Sin comisión» donde no tiene.'
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
          id: 'CMS-03', titulo: 'La comisión no se cambia desde Ventas', negativa: true,
          pasos: [
            'En «Detalle» pulsa «Abrir el producto para editarla».'
          ],
          espera: [
            'Abre la ficha del producto, pero sin botón «Editar»: las comisiones las fija PM y tú solo las consultas.'
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
            'Consulta un producto que hayas vendido y ubica una fila de compra y una de venta.'
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
          id: 'OT-03', titulo: 'La orden no se procesa desde Ventas', negativa: true,
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

    /* ============================================================== GESTIONES */
    {
      id: 'gestiones', codigo: 'GES', titulo: 'Gestiones y documentos pendientes de ruta', corto: 'Gestiones de ruta', ruta: 'Rutas → «Gestiones» · «Consulta de gestiones» · «Documentos pendientes»', url: 'rutas-gestiones', color: '#7c3aed',
      pruebas: [
        {
          id: 'GES-01', titulo: 'Pedir a Ruta una entrega o un cobro',
          pasos: [
            'Pulsa «Nueva gestión» y llena los obligatorios: «Tipo de persona», «Cliente», «Lugar de gestión», «Tipo de gestión» (por ejemplo una entrega o un cobro), «Prioridad», «Descripción», «Área que envía», «Lugar de ruta» y «Fecha».',
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
