/* ============================================================================
   Checklist de pruebas · Área: Garantías · DSIN ERP
   Tres pruebas por pantalla, cada una en una o dos líneas: qué hacer (con los
   datos obligatorios y lo que hay que tomar en cuenta) y el resultado esperado.
   Marcado: «rótulo de pantalla», `dato`, **negrita**, [[ruta|enlace al sistema]].
   ============================================================================ */
window.AREA = {
  id: 'garantias',
  nombre: 'Garantías',
  corto: 'Antes de empezar',
  titulo: 'Pruebas de Garantías',
  sub: 'Tres pruebas por pantalla: qué hacer, qué tomar en cuenta y qué debe responder el sistema.',
  color: '#b45309',
  version: '2026-10-09',
  intro: [
    {
      tipo: 'aviso', tono: 'ok', titulo: 'Cómo se hace cada prueba',
      html: 'Escribe tu nombre arriba, abre el sistema en otra pestaña y haz lo que dice «Haz esto». Compara con «Debe pasar» y marca **Correcto**, **Falló**, **Resultado no óptimo** o **No aplica**. Si algo falla o no te convence, escribe en el comentario el mensaje que salió y el número del caso o documento que usaste. Al terminar el día pulsa «Descargar reporte».'
    },
    {
      tipo: 'aviso', tono: 'atencion', titulo: 'Quién hace cada cosa',
      html: 'Cualquier usuario de Garantías **recibe el equipo** y consulta el caso. **Diagnosticar, enviar al proveedor, entregar y cerrar** lo hace CAS: esas pruebas llevan la etiqueta <span class="chip req">Lo hace: CAS</span>. En **Proveedores, Productos, Combos, Compras, Series, Kardex, Hojas de ruta y Activos fijos solo consultas**. Las pruebas de <span class="chip neg">Validación: el sistema debe impedirlo</span> comprueban que no aparezca lo que no te corresponde.'
    },
    {
      tipo: 'aviso', tono: 'peligro', titulo: 'Lo que registres queda guardado',
      html: 'Recibir un equipo lo ingresa a la bodega de garantías y cambia el estado de su serie; un cambio inmediato saca una unidad del inventario. Las **ventas se transmiten a un ambiente de pruebas de Hacienda** (sin validez fiscal), pero sí bajan el inventario. Usa las series y los clientes de prueba que indique el coordinador.'
    }
  ],
  pantallas: [
    /* ============================================================== ÓRDENES DE GARANTÍA */
    {
      id: 'ordenes', codigo: 'GAR', titulo: 'Órdenes de garantía: recibir el equipo', corto: 'Órdenes de garantía', ruta: 'Garantías → «Órdenes de garantía»', url: 'garantias', color: '#b45309',
      pruebas: [
        {
          id: 'GAR-01', titulo: 'Recibir un equipo con serie vendida',
          pasos: [
            'Pulsa «Recibir equipo», escribe el «Número de serie» de un equipo vendido y pulsa «Verificar».',
            'Revisa que se llenen producto, venta y cliente; llena «Fecha de recepción» y «Falla reportada por el cliente» (obligatorios, junto con «Cliente») y pulsa «Recibir equipo».'
          ],
          espera: [
            'Al verificar: «Serie verificada: el equipo es nuestro y está ligado a su venta.», con la vigencia de la garantía.',
            'Se crea el caso GAR-… en estado «Recibido» y ofrece «Abrir comprobante» para imprimirlo y firmarlo.'
          ],
          nota: 'Anota el número del caso: se usa en las pruebas siguientes.'
        },
        {
          id: 'GAR-02', titulo: 'Recibir un equipo sin serie o con serie desconocida',
          pasos: [
            'Pulsa «Recibir equipo», escribe una serie que no exista y pulsa «Verificar». Elige «Cliente» y «Producto» de las listas, llena la falla y guarda.'
          ],
          espera: [
            'Avisa «Esta serie NO está registrada en el sistema…», pero deja guardar.',
            'En el listado el caso sale marcado «Sin verificar».'
          ]
        },
        {
          id: 'GAR-03', titulo: 'Buscar un caso y abrir su comprobante',
          pasos: [
            'Busca el caso de GAR-01 en «Número, cliente, producto o serie...» y pulsa «Filtrar»; prueba también las tarjetas por estado.',
            'Abre el caso con «Ver» y pulsa «Comprobante de recepción».'
          ],
          espera: [
            'El caso aparece con su cliente, producto, serie y estado, y el comprobante abre con dos copias listas para imprimir.',
            'Con el usuario normal de Garantías no aparecen «Continuar», «Corregir datos» ni «Comentar»: eso lo hace CAS.'
          ]
        }
      ]
    },

    /* ============================================================== FLUJO DEL CASO */
    {
      id: 'flujo', codigo: 'FLU', titulo: 'Flujo del caso: diagnóstico, proveedor y entrega', corto: 'Flujo del caso', ruta: 'Garantías → «Órdenes de garantía» → botón «Continuar»', url: 'garantias', color: '#c2410c',
      pruebas: [
        {
          id: 'FLU-01', titulo: 'Diagnosticar y enviar al proveedor', requiere: 'CAS',
          pasos: [
            'En el caso de GAR-01 pulsa «Continuar», llena «Diagnóstico técnico», elige enviar al proveedor en «¿Cómo se va a resolver?» y pulsa «Guardar diagnóstico y continuar».',
            'Llena «Fecha de envío» y «Nota» (obligatorios), más el proveedor y su número de RMA, y pulsa «Registrar envío al proveedor».'
          ],
          espera: [
            '«Diagnóstico registrado. Ahora puede ejecutar la solución propuesta.» y el caso pasa a «En diagnóstico».',
            '«Equipo enviado al proveedor. El caso queda a la espera de su respuesta.» y el caso pasa a «En el proveedor».'
          ]
        },
        {
          id: 'FLU-02', titulo: 'Registrar la respuesta del proveedor y entregar al cliente', requiere: 'CAS',
          pasos: [
            'En «1. ¿Qué respondió el proveedor?» elige que devolvió el equipo reparado, llena la nota y pulsa «Registrar la respuesta del proveedor».',
            'Llena «Fecha de entrega» y «Nota de la entrega» (obligatorias) y pulsa «Entregar al cliente y cerrar el caso».'
          ],
          espera: [
            '«Resolución registrada. El caso queda listo para entregar al cliente.».',
            'El caso queda «Entregado al cliente (cerrado)» y aparece el «Comprobante de entrega».'
          ]
        },
        {
          id: 'FLU-03', titulo: 'Cambio inmediato por una unidad del inventario', requiere: 'CAS',
          para: 'Usa otro caso recibido, de un producto con existencia.',
          pasos: [
            'En el diagnóstico elige el cambio inmediato. Luego llena «Bodega de la que sale la unidad» y «Nota» (obligatorios; también la serie si el producto la maneja) y pulsa «Entregar unidad nueva (salida de inventario)».'
          ],
          espera: [
            'El caso queda «Cliente atendido, pendiente de reposición del proveedor».',
            'En Kardex hay una salida de 1 unidad con el número del caso. Sin existencia avisa «Stock insuficiente…» y no la entrega.'
          ]
        }
      ]
    },

    /* ============================================================== BODEGA DE GARANTÍAS */
    {
      id: 'bodega', codigo: 'BOD', titulo: 'Bodega de garantías', corto: 'Bodega de garantías', ruta: 'Garantías → «Bodega de garantías»', url: 'garantias/bodega', color: '#0d9488',
      pruebas: [
        {
          id: 'BOD-01', titulo: 'Ver el equipo recién recibido',
          para: 'Hazla después de GAR-01.',
          pasos: [
            'Busca el equipo del caso de GAR-01 y abre «Kardex del artículo».'
          ],
          espera: [
            'El equipo aparece como «Equipo del cliente en custodia», con estado «En la bodega», y su kardex muestra el ingreso ligado al caso.'
          ]
        },
        {
          id: 'BOD-02', titulo: 'Seguir el equipo durante el caso',
          para: 'Hazla después de FLU-01 y de FLU-02.',
          pasos: [
            'Vuelve a buscar el equipo después del envío al proveedor y después de la entrega al cliente.'
          ],
          espera: [
            'Tras el envío sale «Donde el proveedor»; tras la entrega, «Entregado al cliente».'
          ]
        },
        {
          id: 'BOD-03', titulo: 'La bodega no se modifica con el usuario normal', negativa: true,
          pasos: [
            'Con el usuario normal de Garantías busca los botones «Ingresar artículo» y «Registrar movimiento».'
          ],
          espera: [
            'No aparecen: los ingresos y movimientos manuales de esta bodega los hace CAS.'
          ]
        }
      ]
    },

    /* ============================================================== HISTÓRICO Y GARANTÍA POR PRODUCTO */
    {
      id: 'historico', codigo: 'HIS', titulo: 'Histórico de garantías y garantía por producto', corto: 'Histórico · Garantía por producto', ruta: 'Garantías → «Histórico de garantías» · «Garantía por producto»', url: 'garantias/historico', color: '#475569',
      pruebas: [
        {
          id: 'HIS-01', titulo: 'Revisar el histórico',
          pasos: [
            'Abre «Histórico de garantías» y compara su tarjeta «Casos abiertos» con el listado de «Órdenes de garantía» filtrado por «Casos abiertos».'
          ],
          espera: [
            'Los dos números coinciden, y el histórico incluye los casos de GAR-01 y GAR-02.'
          ]
        },
        {
          id: 'HIS-02', titulo: 'Consultar la garantía de un producto',
          pasos: [
            'En «Garantía por producto» busca el producto del caso de GAR-01.'
          ],
          espera: [
            'Muestra el tiempo de garantía del producto, y coincide con la vigencia que calculó el caso al verificar la serie.'
          ]
        },
        {
          id: 'HIS-03', titulo: 'El tiempo de garantía no se cambia con el usuario normal', negativa: true,
          pasos: [
            'En «Garantía por producto» busca el botón «Aplicar» o un botón de guardar en cada fila.'
          ],
          espera: [
            'No aparecen: tu usuario solo consulta las garantías de los productos.'
          ]
        }
      ]
    },

    /* ============================================================== SERIES */
    {
      id: 'series', codigo: 'SER', titulo: 'Series', corto: 'Series', ruta: 'Inventario → «Series»', url: 'series', color: '#7c3aed',
      pruebas: [
        {
          id: 'SER-01', titulo: 'Buscar una serie',
          pasos: [
            'Escribe una serie en «Serie o producto...» y pulsa «Filtrar».'
          ],
          espera: [
            'Muestra su «Producto», «Estado», la «Compra» en que entró, la «Venta» en que salió y la fecha de «Garantía hasta».'
          ]
        },
        {
          id: 'SER-02', titulo: 'Ver cómo cambia la serie con el caso',
          para: 'Hazla después de GAR-01 y otra vez después de FLU-02.',
          pasos: [
            'Busca la serie del equipo de GAR-01.'
          ],
          espera: [
            'Mientras el caso está abierto la serie sale en estado «Garantia»; al cerrarlo vuelve a «Vendida».'
          ]
        },
        {
          id: 'SER-03', titulo: 'Filtrar por estado',
          pasos: [
            'Escribe el nombre de un producto, elige «Disponible» en «Todos los estados» y pulsa «Filtrar».'
          ],
          espera: [
            'Quedan solo las series de ese producto que siguen en inventario.'
          ]
        }
      ]
    },

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
            '«Cliente … creado correctamente.». Aparece en el listado con su código generado solo y se puede elegir en «Recibir equipo» y en «Nueva venta».'
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
          id: 'PRV-03', titulo: 'Los proveedores no se registran desde Garantías', negativa: true,
          pasos: [
            'Busca en el listado y en la ficha los botones «Nuevo proveedor», «Crear contacto», «Editar» y «Eliminar».'
          ],
          espera: [
            'No aparece ninguno: tu usuario solo consulta proveedores (los registra Almacén).'
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
            'La ficha muestra su garantía y sus precios; «Existencias» una fila por bodega; y «Kardex» cada movimiento, incluidos los de casos de garantía.'
          ]
        },
        {
          id: 'PRO-03', titulo: 'Los productos no se crean ni se editan desde Garantías', negativa: true,
          pasos: [
            'Busca el botón «Nuevo producto» y pulsa el lápiz de cualquier producto.'
          ],
          espera: [
            'No aparece «Nuevo producto», y el lápiz no deja editar: tu usuario solo consulta productos.'
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
          id: 'CBO-03', titulo: 'Los combos no se editan desde Garantías', negativa: true,
          pasos: [
            'En la ficha de un combo busca los botones «Editar» e «Historial de precios».'
          ],
          espera: [
            'No aparecen, y el costo del combo se muestra como restringido.'
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
          id: 'COM-03', titulo: 'Las compras no se ingresan desde Garantías', negativa: true,
          pasos: [
            'Busca los botones «Nueva compra» en el listado de compras y «Nueva nota» en el de notas de crédito. En la ficha de una compra busca «Completar» y «Anular».'
          ],
          espera: [
            'No aparece ninguno: tu usuario solo consulta las compras y sus notas de crédito (las ingresa Almacén). La nota de crédito del proveedor de un caso se registra ahí.'
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
            'Consulta un producto que tenga movimiento y ubica una fila de compra y una de venta.'
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
          id: 'HOJ-03', titulo: 'Las hojas no se arman desde Garantías', negativa: true,
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
          id: 'GES-01', titulo: 'Pedir a Ruta un retiro o una entrega de garantía',
          pasos: [
            'Pulsa «Nueva gestión» y llena los obligatorios: «Tipo de persona», «Cliente», «Lugar de gestión», «Tipo de gestión» (retiro o entrega de garantía), «Prioridad», «Descripción», «Área que envía», «Lugar de ruta» y «Fecha».',
            'Llena los campos extra que aparezcan (producto, serie, diagnóstico) y pulsa «Guardar gestión».'
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

    /* ============================================================== ACTIVOS FIJOS */
    {
      id: 'activos-fijos', codigo: 'ACF', titulo: 'Activos fijos', corto: 'Activos fijos', ruta: 'Activos Fijos → «Activos fijos» · «Activos por colaborador»', url: 'activos', color: '#475569',
      pruebas: [
        {
          id: 'ACF-01', titulo: 'Ver los activos a tu cargo',
          pasos: [
            'Entra a «Activos fijos» y abre uno de tus activos con «Ver ficha».'
          ],
          espera: [
            'Se listan solo los activos que tienes en resguardo, y la ficha muestra la «Asignación vigente» y la «Historia del activo».',
            'Si no tienes ninguno, dice «Sin activos registrados».'
          ]
        },
        {
          id: 'ACF-02', titulo: 'Consultar los activos de un colaborador',
          pasos: [
            'En «Activos por colaborador» elige a una persona en «Seleccione un colaborador...».'
          ],
          espera: [
            'Muestra cuántos activos tiene en resguardo y la lista de cada uno con su estado.'
          ]
        },
        {
          id: 'ACF-03', titulo: 'Los activos no se asignan desde aquí', negativa: true,
          pasos: [
            'Busca el botón «Asignación directa» en el listado e «Imprimir acta de entrega» en la ficha de un activo.'
          ],
          espera: [
            'No aparecen: un activo solo se recibe a través de una solicitud aprobada (ver ACT-01).'
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
