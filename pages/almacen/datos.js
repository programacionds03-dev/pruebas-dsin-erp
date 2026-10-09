/* ============================================================================
   Checklist de pruebas · Área: Almacén / Compras · DSIN ERP
   Tres pruebas por pantalla, cada una en una o dos líneas: qué hacer (con los
   datos obligatorios y lo que hay que tomar en cuenta) y el resultado esperado.
   Marcado: «rótulo de pantalla», `dato`, **negrita**, [[ruta|enlace al sistema]].
   ============================================================================ */
window.AREA = {
  id: 'almacen',
  serie: 2, // cambia al rehacer las pruebas: así no se mezclan avances de la versión anterior
  nombre: 'Almacén / Compras',
  corto: 'Antes de empezar',
  titulo: 'Pruebas de Almacén / Compras',
  sub: 'Tres pruebas por pantalla: qué hacer, qué tomar en cuenta y qué debe responder el sistema.',
  color: '#0c6a66',
  version: '2026-10-09',
  intro: [
    {
      tipo: 'aviso', tono: 'ok', titulo: 'Cómo se hace cada prueba',
      html: 'Escribe tu nombre arriba, abre el sistema en otra pestaña y haz lo que dice «Haz esto». Compara con «Debe pasar» y marca **Correcto**, **Falló**, **Resultado no óptimo** o **No aplica**. Si algo falla o no te convence, escribe en el comentario el mensaje que salió y el número del documento que usaste. Al terminar el día pulsa «Descargar reporte».'
    },
    {
      tipo: 'aviso', tono: 'atencion', titulo: 'Tu usuario registra y consulta; no edita',
      html: 'Con tu usuario puedes crear y consultar, pero no editar, completar, anular ni eliminar: por eso algunos botones no aparecen. En **Reservas solo consultas**, en **Movimientos solo haces traslados entre bodegas**, y a los productos **no les pones precio** (eso lo hace el PM). Las pruebas con la etiqueta <span class="chip req">Lo hace: Administrador</span> necesitan que el coordinador haga ese paso. Las de <span class="chip neg">Validación: el sistema debe impedirlo</span> comprueban que el sistema no deje hacer algo indebido.'
    },
    {
      tipo: 'aviso', tono: 'peligro', titulo: 'Es el sistema real',
      html: 'Lo que registres queda guardado: una compra procesada sube existencias. Usa el **proveedor y los productos de prueba** que te indique el coordinador y anota en el comentario el número de cada compra, movimiento o reserva.'
    }
  ],
  pantallas: [
    /* ============================================================== PROVEEDORES */
    {
      id: 'proveedores', codigo: 'PRV', titulo: 'Proveedores', corto: 'Proveedores', ruta: 'Generales → «Proveedores»', url: 'proveedores', color: '#475569',
      pruebas: [
        {
          id: 'PRV-01', titulo: 'Registrar un proveedor',
          pasos: [
            'Pulsa «Nuevo proveedor», llena «Nombre / Razon social» y «NIT» (obligatorios; el NIT lleva 14 dígitos) más el resto de sus datos, y pulsa «Guardar proveedor».',
            'Búscalo en el listado y en el buscador «Proveedor» de una compra nueva.'
          ],
          espera: [
            '«Proveedor … creado correctamente.». Aparece en el listado con «Codigo» generado solo y «Estado» Activo, y se puede elegir en una compra.'
          ]
        },
        {
          id: 'PRV-02', titulo: 'Agregar un contacto al proveedor',
          pasos: [
            'En la fila del proveedor de PRV-01 pulsa «Crear contacto», llena «Nombre», «Telefono», «Correo» y «Cargo» (obligatorios) y pulsa «Agregar».',
            'En su ficha revisa «Resumen comercial» y pulsa «Compras».'
          ],
          espera: [
            '«Contacto agregado correctamente.» y el contador de contactos sube 1.',
            'La ficha muestra «Total de compras» y «Monto acumulado»; no aparecen «Editar» ni «Eliminar».'
          ]
        },
        {
          id: 'PRV-03', titulo: 'Datos que el sistema no debe aceptar', negativa: true,
          pasos: [
            'Intenta guardar tres proveedores: uno con el mismo nombre de PRV-01, uno de «Tipo de persona» Jurídica sin «NIT», y uno con «Telefono» de 7 dígitos.'
          ],
          espera: [
            'Ninguno se guarda: «Ya existe un proveedor con un nombre muy parecido.», «El NIT es obligatorio para persona juridica.» y «El telefono debe tener el formato 0000-0000.».'
          ]
        }
      ]
    },

    /* ============================================================== PRODUCTOS */
    {
      id: 'productos', codigo: 'PRO', titulo: 'Productos / Servicios', corto: 'Productos / Servicios', ruta: 'Inventario → «Productos / Servicios»', url: 'productos', color: '#0c6a66',
      pruebas: [
        {
          id: 'PRO-01', titulo: 'Crear un producto (sin precios)',
          pasos: [
            'Pulsa «Nuevo producto», llena «Nombre», «Tipo» y «Categoría» (obligatorios) y deja «Código / SKU» vacío.',
            'No llenes la tarjeta «Listas de precios» (los precios los pone el PM) y pulsa «Guardar producto».'
          ],
          espera: [
            'Se guarda sin precios y con el código generado solo. En el listado sale «Activo» y con «Estado inv.» Agotado.'
          ],
          nota: 'Anota el código del producto: lo usarás en las compras y movimientos de prueba.'
        },
        {
          id: 'PRO-02', titulo: 'Buscar un producto y revisar su ficha',
          pasos: [
            'Busca un producto con existencias, prueba la casilla «Bajo stock mínimo» y abre su ficha.',
            'Recorre las pestañas «Ficha», «Existencias», «Kardex», «Compras y proveedores» e «Histórico de precios/costos».'
          ],
          espera: [
            '«Existencias» muestra una fila por bodega de tu sucursal y «Kardex» cada entrada y salida con su «Saldo».',
            'Con tu usuario no se ven costos, ni «Editar», ni «Guardar precios».'
          ]
        },
        {
          id: 'PRO-03', titulo: 'Código repetido y botón sin permiso', negativa: true,
          pasos: [
            'Crea un producto escribiendo en «Código / SKU» un código que ya existe.',
            'En el listado pulsa el lápiz de cualquier producto.'
          ],
          espera: [
            'El producto no se guarda: el código marca error de valor ya registrado.',
            'El lápiz abre «Acceso no autorizado» con el permiso `productos.editar`; «Volver» regresa al listado.'
          ]
        }
      ]
    },

    /* ============================================================== CATEGORÍAS, SUBCATEGORÍAS, MARCAS */
    {
      id: 'catalogos', codigo: 'CAT', titulo: 'Categorías, subcategorías y marcas', corto: 'Categorías · Subcategorías · Marcas', ruta: 'Inventario → «Categorías» · «Subcategorías» · «Marcas»', url: 'categorias', color: '#475569',
      pruebas: [
        {
          id: 'CAT-01', titulo: 'Crear una categoría',
          pasos: [
            'En «Categorías» pulsa «Nueva categoría», llena «Nombre» (obligatorio) y «Código» = PRU-CAT, y pulsa «Guardar».',
            'Intenta crear otra con el mismo código.'
          ],
          espera: [
            '«Categoría creada correctamente.». La segunda no se guarda: avisa que ya existe una categoría activa con ese código.'
          ]
        },
        {
          id: 'CAT-02', titulo: 'Crear una subcategoría',
          pasos: [
            'En «Subcategorías» pulsa «Nueva subcategoría», llena «Nombre» y «Categoría principal» (obligatorios) con la categoría de CAT-01 y pulsa «Guardar».'
          ],
          espera: [
            '«Subcategoría creada correctamente.». En «Categorías», esa fila pasa a «Subcategorías» 1.'
          ]
        },
        {
          id: 'CAT-03', titulo: 'Crear una marca con su logo',
          pasos: [
            'En «Marcas» pulsa «Nueva marca», llena «Nombre» (obligatorio), sube una «Imagen de la marca» y pulsa «Guardar».',
            'En el listado pulsa el lápiz de esa marca.'
          ],
          espera: [
            '«Marca creada correctamente.» y el logo aparece junto al nombre.',
            'El lápiz abre «Acceso no autorizado» con el permiso `marcas.editar`: tu usuario crea, pero no edita.'
          ]
        }
      ]
    },

    /* ============================================================== COMPRAS */
    {
      id: 'compras', codigo: 'COM', titulo: 'Compras', corto: 'Compras / NC', ruta: 'Inventario → «Compras / NC»', url: 'compras', color: '#0c6a66',
      pruebas: [
        {
          id: 'COM-01', titulo: 'Compra manual al contado',
          pasos: [
            'Pulsa «Nueva compra» → «Compra Manual», llena «Proveedor», «Numero de control», «Fecha», «Sucursal» y «Bodega de ingreso» (obligatorios) y agrega un producto con «Cantidad» 2 y «Precio» 10.00 (sin IVA).',
            'Deja marcada «Procesar al guardar», pulsa «Guardar Compra» y revisa el producto en «Kardex».'
          ],
          espera: [
            '«Total a pagar» $22.60. La compra queda «Procesada» y «Con validez fiscal».',
            'En Kardex hay una «Entrada» por 2 y la existencia de la bodega subió 2.'
          ],
          nota: 'Anota el número de la compra: se usa en NCC-01.'
        },
        {
          id: 'COM-02', titulo: 'Compra al crédito con series y descuento',
          pasos: [
            'Igual que COM-01, con «Forma de pago» = Crédito 30 días y «Plazo dias» = 30, y un producto que maneje series: «Cantidad» 3, «Descuento» 15.00 y solo 2 series en «Una serie por linea».',
            'Pulsa «Guardar Compra», lee el error, agrega la tercera serie y guarda otra vez.'
          ],
          espera: [
            'Con 2 series no se guarda: la cantidad comprada (3) debe coincidir con las series registradas (2).',
            'Con 3 queda «Procesada», con la tarjeta «Series ingresadas (3)», y las series salen «Disponible» en Inventario → «Series».'
          ]
        },
        {
          id: 'COM-03', titulo: 'Compra cargando el archivo JSON del proveedor',
          para: 'Necesitas el archivo .json de un crédito fiscal emitido a la empresa. Pídeselo al coordinador.',
          pasos: [
            'Pulsa «Nueva compra» → «Compra mediante JSON», elige el archivo y pulsa «LEER JSON». Asigna el «Producto interno» en **todas** las filas, elige «Bodega de ingreso» y pulsa «Guardar Compra».',
            'Repite con el mismo archivo.'
          ],
          espera: [
            'El encabezado se llena solo («JSON leido. La compra sigue temporal hasta presionar Guardar Compra.») y la compra queda «Procesada».',
            'El segundo intento falla: «El DTE … ya esta registrado en otra compra.».'
          ]
        }
      ]
    },

    /* ============================================================== NOTAS DE CRÉDITO DE COMPRA */
    {
      id: 'nc-compra', codigo: 'NCC', titulo: 'Notas de crédito de compra', corto: 'Notas de crédito (compras)', ruta: 'Inventario → «Compras / NC» → botón «Notas de credito»', url: 'notas-credito-compra', color: '#c2410c',
      pruebas: [
        {
          id: 'NCC-01', titulo: 'Nota por devolución de producto',
          para: 'Antes: el Administrador debe pulsar «Completar» en la compra de COM-01. Solo las compras completadas admiten nota de crédito.',
          pasos: [
            'Pulsa «Nueva nota», busca la compra y pulsa «Continuar». Con «Concepto» = Devolucion de Producto, llena «Numero de nota» y «Fecha» (obligatorios), marca el producto con «Cantidad a devolver» 1 y pulsa «Registrar nota de credito».'
          ],
          espera: [
            '«Nota de credito … registrada. Procesela para rebajar el inventario.». Queda «Registrada» y las existencias todavía no cambian.'
          ]
        },
        {
          id: 'NCC-02', titulo: 'Nota por descuento',
          pasos: [
            'Sobre otra compra completada registra una nota con «Concepto» = Descuento: llena «Numero de nota», «Fecha», «Monto del descuento» = 25.00 y «Motivo» (todos obligatorios).',
            'Intenta otra dejando vacíos el monto y el motivo.'
          ],
          espera: [
            '«Nota de credito … registrada como descuento. Procesela para rebajar CxP.», con «Monto descuento» en -$25.00.',
            'Sin monto ni motivo no se guarda.'
          ]
        },
        {
          id: 'NCC-03', titulo: 'Procesar la devolución', requiere: 'Administrador',
          pasos: [
            'El Administrador abre la nota de NCC-01 y pulsa «Procesar devolucion».',
            'Tú revisas el «PDF» de la nota, el Kardex del producto y la ficha de la compra.'
          ],
          espera: [
            '«Nota de credito procesada: el inventario fue rebajado.». En Kardex hay una «Salida» y la existencia bajó 1.',
            'La compra lista la nota en «Notas de credito aplicadas».'
          ]
        }
      ]
    },

    /* ============================================================== MOVIMIENTOS */
    {
      id: 'movimientos', codigo: 'TRA', titulo: 'Movimientos: traslados entre bodegas', corto: 'Movimientos', ruta: 'Inventario → «Movimientos»', url: 'movimientos', color: '#1c58ad',
      pruebas: [
        {
          id: 'TRA-01', titulo: 'Trasladar producto de una bodega a otra',
          pasos: [
            'Pulsa «Nuevo movimiento» con tipo Traslado; llena «Tipo de operación», «Sucursal Origen», «Sucursal Destino», «Bodega Origen», «Bodega Destino» (distinta a la de origen) y «Comentario / nota» (obligatorios).',
            'Agrega un producto con «Cantidad solicitada» 1 y guarda con «Procesar de inmediato».'
          ],
          espera: [
            'Queda «Pendiente de recibir» con «Stock en Bodega EN TRANSITO»: la bodega origen baja 1 y la de destino todavía no cambia.'
          ],
          nota: 'Anota el número del traslado: se recibe en TRA-02.'
        },
        {
          id: 'TRA-02', titulo: 'Recibir el traslado en la bodega destino',
          pasos: [
            'Abre el traslado de TRA-01, deja la cantidad completa y pulsa «Recibir».'
          ],
          espera: [
            '«Recepción del producto registrada y existencias actualizadas.». El producto queda «Recibido» y el traslado «Completado».',
            'La existencia de la bodega destino sube 1.'
          ]
        },
        {
          id: 'TRA-03', titulo: 'Recibir menos de lo enviado',
          para: 'Crea antes otro traslado con 3 unidades de un producto.',
          pasos: [
            'Escribe una cantidad menor a la enviada y pulsa «Parcial» sin motivo. Luego llena «Motivo si hay diferencia» y vuelve a pulsar.'
          ],
          espera: [
            'Sin motivo no deja: «Debe indicar el motivo de la diferencia o rechazo.».',
            'Con motivo, el producto queda «Recibido Parcial» y el traslado «Con Observaciones»; lo que no se recibió regresa a la bodega origen.'
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
          id: 'KAR-02', titulo: 'Comprobar que cada operación quedó registrada',
          para: 'Hazla después de COM-01 y TRA-01, con el mismo producto.',
          pasos: [
            'Consulta el producto y ubica la fila de la compra y las dos del traslado.'
          ],
          espera: [
            'Están las tres filas; las dos del traslado tienen el mismo «Saldo» (un traslado no cambia el total).',
            'En «Existencias por sucursal y bodega», cada bodega coincide con lo que hiciste.'
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

    /* ============================================================== UBICACIÓN FÍSICA */
    {
      id: 'ubicaciones', codigo: 'UBI', titulo: 'Ubicacion fisica', corto: 'Ubicacion fisica', ruta: 'Inventario → «Ubicacion fisica»', url: 'ubicaciones-fisicas', color: '#b45309',
      pruebas: [
        {
          id: 'UBI-01', titulo: 'Registrar en qué estante está un producto',
          para: 'Usa un producto con 5 unidades en una bodega tuya.',
          pasos: [
            'En «Producto especifico» elige el producto de la lista; llena «Bodega / area», «Ubicacion fisica» y «Cantidad» = 3 (obligatorios) y pulsa «Guardar».',
            'Con «Nuevo» registra las 2 restantes en otra ubicación.'
          ],
          espera: [
            'Primero queda «Parcialmente ubicado» con «Pendiente de ubicacion» 2; después «Correctamente ubicado» con 0.',
            'Las existencias del producto no cambian.'
          ]
        },
        {
          id: 'UBI-02', titulo: 'Consultar qué falta por ubicar',
          pasos: [
            'Elige «Estado» = Sin ubicacion, pulsa «Consultar» y abre una fila con «Detalle».'
          ],
          espera: [
            'Todas las filas tienen «Cantidad ubicada» 0 y «Pendiente» igual a «Existencia total». «Detalle» abre el producto listo para registrar su ubicación.'
          ]
        },
        {
          id: 'UBI-03', titulo: 'Ubicar más de lo que existe', negativa: true,
          pasos: [
            'En el producto de UBI-01 (ya todo ubicado) intenta guardar 1 unidad más en otra ubicación.'
          ],
          espera: [
            '«La cantidad asignada a ubicaciones fisicas supera la existencia disponible en esta sucursal/bodega.».',
            'En «Acciones» no hay lápiz ni papelera.'
          ]
        }
      ]
    },

    /* ============================================================== RESERVAS */
    {
      id: 'reservas', codigo: 'RSV', titulo: 'Reservas de producto', corto: 'Reservas', ruta: 'Inventario → «Reservas»', url: 'reservas', color: '#7c3aed',
      pruebas: [
        {
          id: 'RSV-01', titulo: 'Buscar reservas',
          pasos: [
            'Filtra el listado por «Estado» y por «Vendedor», o escribe un cliente o un producto en «Busqueda», y pulsa «Filtrar».'
          ],
          espera: [
            'Quedan solo las reservas que cumplen, y las vencidas se distinguen en rojo.'
          ]
        },
        {
          id: 'RSV-02', titulo: 'Revisar una reserva',
          pasos: [
            'Abre una reserva con el icono del ojo.'
          ],
          espera: [
            'Muestra el cliente, quién la solicitó, la «Fecha estimada» y cada producto con su cantidad, sus bodegas y su estado.'
          ]
        },
        {
          id: 'RSV-03', titulo: 'Las reservas no se crean ni se liberan desde Almacén', negativa: true,
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
            'Se crea con número OT-… e insignia «Solicitud». No mueve inventario.',
            'Con tu usuario no aparecen «Editar», «Marcar procesado», «Anular» ni «Finalizar».'
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
          id: 'OT-03', titulo: 'Procesar y finalizar la orden', requiere: 'Técnico asignado / Administrador',
          pasos: [
            'El técnico asignado (o el Administrador) pulsa «Marcar procesado» y después «Finalizar» en la orden de OT-01.'
          ],
          espera: [
            'Pasa a «Procesado» y luego a «Finalizado», con las fechas «Procesada» y «Finalizada». Las tarjetas del listado cambian su conteo.'
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
            'Escribe en «Serie o producto...» una serie de COM-02 y pulsa «Filtrar». Luego filtra ese producto por el estado «Disponible».'
          ],
          espera: [
            'La serie sale «Disponible», con su compra enlazada y sin datos en «Venta» ni en «Garantía hasta».'
          ]
        },
        {
          id: 'SER-02', titulo: 'Seguir una serie hasta la venta',
          para: 'Necesita que Ventas facture una unidad del producto con series de COM-02.',
          pasos: [
            'Despacha esa venta leyendo una de las series (DES-01) y vuelve a buscar la serie.'
          ],
          espera: [
            'La serie pasa a «Vendida»; «Venta» muestra el número de control y «Garantía hasta» la fecha límite.'
          ]
        },
        {
          id: 'SER-03', titulo: 'Una serie no se registra dos veces', negativa: true,
          pasos: [
            'Registra una compra del producto con series escribiendo en «Una serie por linea» una serie que ya ingresaste en COM-02.'
          ],
          espera: [
            'La compra no se guarda: «Las siguientes series ya existen: …».'
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

    /* ============================================================== CONSULTAS DTE */
    {
      id: 'dte', codigo: 'DTE', titulo: 'Documentos DTE, remisiones, retornos e invalidaciones', corto: 'Consultas de documentos', ruta: 'Facturación → «Documentos DTE» · «Notas de remisión» · «Eventos de retorno» · «Invalidaciones»', url: 'ventas', color: '#1c58ad',
      pruebas: [
        {
          id: 'DTE-01', titulo: 'Buscar las ventas que hay que preparar',
          pasos: [
            'En «Documentos DTE» filtra por estado Transmitida y entrega Pendiente de ruta, con **las dos** fechas (con una sola no filtra), y abre un documento con «Ver detalle».'
          ],
          espera: [
            'Solo salen documentos de tu sucursal, y el detalle muestra productos y cantidades.',
            'Los mismos documentos están en «Despachos» → «Despacho por Rutas».'
          ],
          nota: '«Nueva venta», «PDF / Imprimir DTE» y «JSON DTE» no son de tu perfil: dan «Acceso no autorizado».'
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
            'Abre un documento en «Notas de remisión», uno en «Eventos de retorno» y uno en «Invalidaciones».',
            'Busca el documento invalidado en «Despachos» → «Consulta de documento».'
          ],
          espera: [
            'Los retornos indican en «Inventario» si el producto «Reingresa» o queda «Sin reingreso».',
            'El documento invalidado sale «Anulado» en Despachos y sin «Preparar despacho».'
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
          id: 'RUT-03', titulo: 'Ventas de ruta pendientes y su despacho',
          para: 'Necesita una venta con ruta emitida por Ventas.',
          pasos: [
            'En «Documentos pendientes» ubica la venta y mira «Despacho de bodega». Despáchala (DES-01) y vuelve a esta pantalla.'
          ],
          espera: [
            'Antes dice «Sin despachar» y después «Despachado».',
            'No hay casillas ni «Asignar a la hoja de ruta»: eso lo hace el área de Rutas.'
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
          id: 'ACT-02', titulo: 'Aprobar la solicitud', requiere: 'Supervisor (Jonathan Sigüenza)',
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
