/* ============================================================================
   Checklist de pruebas · Área: CXC (cuentas por cobrar y caja) · DSIN ERP
   Tres pruebas por pantalla, cada una en una o dos líneas: qué hacer (con los
   datos obligatorios y lo que hay que tomar en cuenta) y el resultado esperado.
   Marcado: «rótulo de pantalla», `dato`, **negrita**, [[ruta|enlace al sistema]].
   ============================================================================ */
window.AREA = {
  id: 'cxc',
  nombre: 'CXC',
  corto: 'Antes de empezar',
  titulo: 'Pruebas de CXC',
  sub: 'Tres pruebas por pantalla: qué hacer, qué tomar en cuenta y qué debe responder el sistema.',
  color: '#1c58ad',
  version: '2026-10-09',
  intro: [
    {
      tipo: 'aviso', tono: 'ok', titulo: 'Cómo se hace cada prueba',
      html: 'Escribe tu nombre arriba, abre el sistema en otra pestaña y haz lo que dice «Haz esto». Compara con «Debe pasar» y marca **Correcto**, **Falló**, **Resultado no óptimo** o **No aplica**. Si algo falla o no te convence, escribe en el comentario el mensaje que salió y el número del documento que usaste. Al terminar el día pulsa «Descargar reporte».'
    },
    {
      tipo: 'aviso', tono: 'atencion', titulo: 'Qué necesitas antes de empezar',
      html: 'Un **documento al crédito con saldo** (nace cuando Ventas factura al crédito) y un **crédito por cuotas en estado «Vigente»** (lo configura otro rol). Abre el **corte de caja** y la **caja física** del día antes de cobrar (pruebas COR-01 y CAJ-01), para que los cobros caigan en el corte. Las pruebas con la etiqueta <span class="chip req">Lo hace: Supervisor CXC</span> son solo del supervisor.'
    },
    {
      tipo: 'aviso', tono: 'peligro', titulo: 'Lo que registres queda guardado',
      html: 'Un abono baja el saldo del cliente y **con tu usuario no se puede anular**. Usa los clientes y documentos de prueba que indique el coordinador, con montos pequeños, y **no cambies el texto del campo «Caja»** al cobrar: con otro nombre el cobro no entra al corte.'
    }
  ],
  pantallas: [
    /* ============================================================== CUENTAS POR COBRAR */
    {
      id: 'cuentas', codigo: 'CXC', titulo: 'Cuentas por cobrar', corto: 'Cuentas por cobrar', ruta: 'Cuentas por cobrar → «Cuentas por cobrar»', url: 'cxc', color: '#1c58ad',
      pruebas: [
        {
          id: 'CXC-01', titulo: 'Registrar un abono',
          pasos: [
            'Ubica un documento con saldo (el listado abre en «Pendientes») y pulsa «Abonar».',
            'Llena «Monto del abono» con menos que el saldo y «Forma de pago» (obligatorios), más «Numero de recibo» y «Referencia», y pulsa «Registrar abono».'
          ],
          espera: [
            '«Abono registrado; el saldo de la cuenta fue actualizado.». El documento pasa a «Parcialmente pagado».',
            'En su detalle, el abono aparece en la tabla de abonos y saldados con estado «Activo».'
          ],
          nota: 'Anota el documento y el cliente: se usan en las pruebas siguientes.'
        },
        {
          id: 'CXC-02', titulo: 'Saldar el documento',
          pasos: [
            'En el mismo documento pulsa «Saldar», llena «Forma de pago», «Numero de recibo» y «Referencia» (obligatorios) y confirma con «Saldar».'
          ],
          espera: [
            '«Cuenta saldada completamente.». El documento queda «Pagado» y ya no ofrece «Abonar» ni «Saldar».',
            'Con tu usuario no hay botón para anular un abono.'
          ]
        },
        {
          id: 'CXC-03', titulo: 'Consultar la cartera de un cliente',
          pasos: [
            'Abre la pestaña «Clientes CXC», busca un cliente y ábrelo con «Ver cliente».'
          ],
          espera: [
            'Muestra «Montos globales de credito», «Estado de cartera» y «Comportamiento de pago», con sus documentos por estado.',
            'Solo ves documentos de tu sucursal.'
          ]
        }
      ]
    },

    /* ============================================================== ESTADOS DE CUENTA */
    {
      id: 'estados', codigo: 'EDC', titulo: 'Estado de cuenta y línea financiera', corto: 'Estado de cuenta', ruta: 'Cuentas por cobrar → «Estado cuenta» · «Estado cliente» · «Linea financiera»', url: 'cxc/estado-cuenta', color: '#7c3aed',
      pruebas: [
        {
          id: 'EDC-01', titulo: 'Consultar el estado de cuenta consolidado',
          pasos: [
            'En «Estado cuenta» elige el «Cliente» de CXC-01 y pulsa «Consultar».'
          ],
          espera: [
            'Muestra «Total factura», «Total pagado», «Saldo real» y «Saldo vencido», con sus documentos, créditos por cuotas y pagos.',
            '«Saldo real» coincide con la suma de los saldos de sus documentos.'
          ]
        },
        {
          id: 'EDC-02', titulo: 'Imprimir el estado para entregarlo al cliente',
          pasos: [
            'Pulsa «Cliente final» y, en esa vista, «Imprimir».'
          ],
          espera: [
            'Abre el «Estado de cuenta para cliente» en otra pestaña, listo para imprimir, con sus documentos pendientes y sus pagos.',
            'Sin elegir cliente no aparece el botón «Imprimir».'
          ]
        },
        {
          id: 'EDC-03', titulo: 'Ver la historia del cliente en la línea financiera',
          pasos: [
            'En «Linea financiera» elige el mismo cliente y pulsa «Consultar».'
          ],
          espera: [
            'Aparecen en orden el documento, el abono de CXC-01 y el saldado de CXC-02, cada uno con su tipo.'
          ]
        }
      ]
    },

    /* ============================================================== VENCIMIENTOS Y CARTERA */
    {
      id: 'vencimientos', codigo: 'VTO', titulo: 'Vencimientos y cartera', corto: 'Vencimientos y cartera', ruta: 'Cuentas por cobrar → «Agenda vencimientos» · «Calendario CxC» · «Dashboard cartera»', url: 'cxc/calendario-agenda', color: '#be185d',
      pruebas: [
        {
          id: 'VTO-01', titulo: 'Revisar la agenda de vencimientos',
          pasos: [
            'En «Agenda vencimientos» elige «Estado» = Vencidos y pulsa «Buscar». Repite con «Tipo» = Credito por cuotas.'
          ],
          espera: [
            'Cada consulta deja solo lo pedido: primero solo lo vencido, después solo las cuotas.'
          ]
        },
        {
          id: 'VTO-02', titulo: 'Ver los vencimientos en el calendario',
          pasos: [
            'Abre «Calendario CxC» y ubica un documento vencido y uno vigente.'
          ],
          espera: [
            'Los vencidos salen en rojo, los que vencen hoy o pronto en amarillo y los vigentes en verde.',
            'El documento saldado en CXC-02 ya no aparece.'
          ]
        },
        {
          id: 'VTO-03', titulo: 'Revisar el dashboard de cartera',
          pasos: [
            'Abre «Dashboard cartera» y pulsa «Actualizar».'
          ],
          espera: [
            'Muestra «Saldo cartera» y «Saldo vencido», la «Antiguedad de saldos» por tramos de días y los «Clientes con mayor saldo».'
          ]
        }
      ]
    },

    /* ============================================================== GESTIÓN DE COBRANZA */
    {
      id: 'cobranza', codigo: 'COB', titulo: 'Gestión de cobranza', corto: 'Gestión de cobranza', ruta: 'Cuentas por cobrar → «Gestion cobranza»', url: 'cxc/gestion-cobranza', color: '#0d9488',
      pruebas: [
        {
          id: 'COB-01', titulo: 'Registrar una promesa de pago',
          pasos: [
            'En «Registrar seguimiento» llena «Cliente», «Fecha gestion», «Resultado» = Promesa de pago y «Estado» (obligatorios), más «Fecha promesa» y «Monto promesa», y pulsa «Guardar».'
          ],
          espera: [
            '«Gestion de cobranza registrada correctamente.». La fila aparece en «Seguimientos registrados».',
            'No cambia el saldo del cliente ni la caja.'
          ]
        },
        {
          id: 'COB-02', titulo: 'Buscar el seguimiento y verlo en la línea financiera',
          pasos: [
            'Filtra «Seguimientos registrados» por cliente y pulsa «Buscar». Luego consulta ese cliente en «Linea financiera».'
          ],
          espera: [
            'El seguimiento aparece en el listado y también en la línea financiera, como gestión de cobranza.'
          ]
        },
        {
          id: 'COB-03', titulo: 'Seguimiento sin cliente', negativa: true,
          pasos: [
            'Intenta guardar un seguimiento sin elegir «Cliente».'
          ],
          espera: [
            '«El campo cliente es obligatorio.» y no se guarda.',
            'Un seguimiento ya guardado no se puede editar ni borrar.'
          ]
        }
      ]
    },

    /* ============================================================== CRÉDITOS POR CUOTAS */
    {
      id: 'cuotas', codigo: 'CUO', titulo: 'Calculadora y crédito por cuotas', corto: 'Crédito por cuotas', ruta: 'Cuentas por cobrar → «Calculadora credito» · «Credito por cuotas»', url: 'creditos-cuotas', color: '#b45309',
      pruebas: [
        {
          id: 'CUO-01', titulo: 'Simular un crédito en la calculadora',
          pasos: [
            'En «Calculadora credito» llena «Cliente», «Valor del credito» = 259.00, «Prima» = 50.00 y «Cuotas» = 6 (obligatorios), deja «Interes mensual» vacío y pulsa «Calcular».'
          ],
          espera: [
            '«Capital financiado» sale en $209.00, con el «Valor aproximado de cuota» y la tabla de las 6 cuotas con sus fechas.',
            '«Imprimir» abre el cálculo en otra pestaña. La calculadora no guarda nada.'
          ]
        },
        {
          id: 'CUO-02', titulo: 'Cobrar una cuota',
          para: 'Necesita un crédito en estado «Vigente» (lo configura otro rol).',
          pasos: [
            'En «Credito por cuotas» abre el crédito con «Abrir» y pulsa «Pagar» en la primera cuota con saldo. Deja el «Monto» propuesto, elige «Forma de pago» (obligatorios) y pulsa «Registrar pago».'
          ],
          espera: [
            '«Pago aplicado al calendario de cuotas.». La cuota pasa a «Pagada» y baja el «Saldo real».',
            'El pago aparece en «Historial de pagos».'
          ],
          nota: 'Si pagas más que la cuota, el excedente se aplica a la siguiente.'
        },
        {
          id: 'CUO-03', titulo: 'Pago mayor al saldo y crédito sin configurar', negativa: true,
          pasos: [
            'Intenta pagar un monto mayor que todo lo que debe el crédito.',
            'Abre un crédito en estado «Pendiente de configurar».'
          ],
          espera: [
            '«El pago no puede superar el saldo pendiente de las cuotas seleccionadas.».',
            'En el crédito sin configurar no aparecen «Registrar prima» ni «Generar cuotas»: eso lo hace otro rol.'
          ]
        }
      ]
    },

    /* ============================================================== CORTE DE CAJA */
    {
      id: 'corte', codigo: 'COR', titulo: 'Corte de caja', corto: 'Corte de caja', ruta: 'Cuentas por cobrar → «Corte de caja»', url: 'caja', color: '#c2410c',
      pruebas: [
        {
          id: 'COR-01', titulo: 'Abrir el corte del día',
          pasos: [
            'Pulsa «Abrir corte», deja la «Fecha» de hoy (obligatoria), escribe «Fondo inicial» = 50 y pulsa «Abrir».'
          ],
          espera: [
            '«Corte de caja abierto.». La insignia de arriba pasa a «Abierto» y en «Arqueo» el «Fondo inicial» muestra $50.00.'
          ]
        },
        {
          id: 'COR-02', titulo: 'Registrar un gasto y una remesa',
          para: 'Hazla con el corte de hoy abierto.',
          pasos: [
            'En la tarjeta «Movimientos» pulsa el botón del recibo y registra un gasto con «Monto» = 5 y «Motivo» (obligatorios).',
            'Pulsa el botón de la caja fuerte y registra una remesa con «Recibe» (obligatorio) y un monto mayor que cero.'
          ],
          espera: [
            '«Gasto de caja registrado.» y «Remesa registrada.».',
            'Suben «Gastos de caja» y «Total remesado», y baja «Efectivo disponible en caja».'
          ]
        },
        {
          id: 'COR-03', titulo: 'Cerrar el corte y operar otra fecha', negativa: true,
          pasos: [
            'Busca el botón «Cerrar» y las X para anular una remesa o un gasto.',
            'Cambia «Fecha del corte» a ayer e intenta registrar un gasto.'
          ],
          espera: [
            'No aparecen: cerrar el corte y anular lo hace otro rol.',
            '«No tiene permiso para registrar movimientos de caja en una fecha distinta a la de hoy.».'
          ]
        }
      ]
    },

    /* ============================================================== CONCILIACIÓN CAJA */
    {
      id: 'conciliacion', codigo: 'CON', titulo: 'Conciliación de caja contra CXC', corto: 'Conciliación caja', ruta: 'Cuentas por cobrar → «Conciliacion caja»', url: 'cxc/conciliacion-caja', color: '#475569',
      pruebas: [
        {
          id: 'CON-01', titulo: 'Conciliar los cobros del día',
          para: 'Hazla el mismo día de CXC-01 y CUO-02.',
          pasos: [
            'Abre «Conciliacion caja» (viene con la fecha de hoy) y pulsa «Revisar».'
          ],
          espera: [
            'Aparecen el abono de CXC-01 con fuente «CxC por plazo» y el pago de CUO-02 con fuente «Pago cuota credito», cada uno con el corte en que cayó.'
          ]
        },
        {
          id: 'CON-02', titulo: 'Comparar con el corte de caja',
          pasos: [
            'Abre «Corte de caja» de hoy y revisa en «Resumen» las filas de «Cuentas por cobrar» y «Credito por cuotas».'
          ],
          espera: [
            '«Abonos recibidos» y «Pagos de cuotas» suman lo mismo que «Monto conciliado» en la conciliación.'
          ]
        },
        {
          id: 'CON-03', titulo: 'Cobros de un día sin corte',
          pasos: [
            'En «Conciliacion caja» consulta un día en que hubo cobros pero no se abrió corte.'
          ],
          espera: [
            'Esos cobros salen marcados «Sin corte» y suman en «Movimientos sin corte».'
          ]
        }
      ]
    },

    /* ============================================================== CAJA FÍSICA */
    {
      id: 'caja-fisica', codigo: 'CAJ', titulo: 'Caja física', corto: 'Caja física', ruta: 'Tesoreria → «Caja Fisica Central» · «Movimientos» · «Gastos» · «Remesas»', url: 'caja-fisica', color: '#2563eb',
      pruebas: [
        {
          id: 'CAJ-01', titulo: 'Abrir la caja física del día',
          pasos: [
            'En «Caja Fisica Central», en la tarjeta «Jornada», deja la «Fecha» de hoy, escribe «Monto inicial» = 100 (obligatorios) y pulsa «Abrir caja».'
          ],
          espera: [
            '«Caja Fisica Central abierta.». La jornada queda «Abierta» con su monto inicial.',
            'No aparece «Cerrar caja»: la cierra otro rol.'
          ]
        },
        {
          id: 'CAJ-02', titulo: 'Registrar un ingreso y un gasto',
          para: 'Hazla con la caja de hoy abierta.',
          pasos: [
            'En Tesoreria → «Movimientos» llena «Empresa», «Forma pago», «Monto» = 25.00 y «Observaciones» (obligatorios) y pulsa «Guardar movimiento».',
            'En Tesoreria → «Gastos» llena «Fecha», «Monto» = 10.00, «Motivo» y «Observaciones» (obligatorios) y pulsa «Guardar gasto».'
          ],
          espera: [
            '«Movimiento de Caja Fisica registrado.» y «Gasto de Caja Fisica registrado.».',
            'En «Caja Fisica Central» el «Saldo esperado» sube 25.00 y baja 10.00.'
          ]
        },
        {
          id: 'CAJ-03', titulo: 'Registrar una remesa de caja',
          para: 'Hazla con la caja de hoy abierta.',
          pasos: [
            'En Tesoreria → «Remesas», en «Nueva remesa», llena «Fecha», «Recibe» y una línea con «Empresa», «Forma pago» y «Monto» = 10.00, y pulsa «Guardar remesa».'
          ],
          espera: [
            '«Remesa de Caja Fisica registrada.». La remesa sale «Emitida».',
            'Sube «Total remesado» y el «Saldo esperado» baja 10.00.'
          ]
        }
      ]
    },

    /* ============================================================== BANCOS */
    {
      id: 'bancos', codigo: 'BAN', titulo: 'Bancos', corto: 'Bancos', ruta: 'Tesoreria → «Cuentas bancarias» · «Movimientos bancarios» · «Remesas a banco» · «Catalogo de bancos»', url: 'bancos/cuentas', color: '#2563eb',
      pruebas: [
        {
          id: 'BAN-01', titulo: 'Registrar un movimiento bancario', requiere: 'Supervisor CXC',
          pasos: [
            'En «Movimientos bancarios», en «Registrar movimiento», llena «Cuenta bancaria», «Fecha», «Monto» = 100.00 y «Tipo de movimiento» = Deposito (obligatorios) y pulsa «Registrar».'
          ],
          espera: [
            '«Movimiento bancario registrado.». La fila sale con +$100.00 y «Activo».',
            'En «Cuentas bancarias» el «Saldo actual» de esa cuenta sube 100.00.'
          ]
        },
        {
          id: 'BAN-02', titulo: 'Remesar de caja al banco', requiere: 'Supervisor CXC',
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
          id: 'BAN-03', titulo: 'Bancos y cuentas no se crean desde CXC', requiere: 'Supervisor CXC', negativa: true,
          pasos: [
            'Busca las tarjetas «Nuevo banco» en «Catalogo de bancos» y «Nueva cuenta bancaria» en «Cuentas bancarias», y en «Movimientos bancarios» busca cómo anular uno.'
          ],
          espera: [
            'No aparece ninguna: tu usuario consulta bancos y cuentas, y registra movimientos y remesas, pero no los anula.'
          ]
        }
      ]
    },

    /* ============================================================== REPORTES DEL SUPERVISOR */
    {
      id: 'supervisor', codigo: 'SUP', titulo: 'Reporte de cuotas y bitácora de CXC', corto: 'Reporte cuotas · Bitácora', ruta: 'Cuentas por cobrar → «Reporte cuotas» · «Bitacora CxC»', url: 'cxc/reporte-creditos-cuotas', color: '#475569',
      pruebas: [
        {
          id: 'SUP-01', titulo: 'Consultar el reporte de créditos por cuotas', requiere: 'Supervisor CXC',
          pasos: [
            'En «Reporte cuotas» elige un «Estado credito» y pulsa «Buscar».'
          ],
          espera: [
            'Muestra los totales de «Creditos», «Pagado», «Saldo» y «Vencido», y cada crédito con su «Proximo vencimiento».',
            'El crédito de CUO-02 aparece con el saldo ya rebajado.'
          ]
        },
        {
          id: 'SUP-02', titulo: 'Revisar la bitácora de CXC', requiere: 'Supervisor CXC',
          para: 'Hazla después de CXC-01, CXC-02 y CUO-02.',
          pasos: [
            'Abre «Bitacora CxC» y busca los movimientos de hoy.'
          ],
          espera: [
            'Están registrados el abono, el saldado y el pago de la cuota, cada uno con su usuario, fecha y monto.'
          ]
        },
        {
          id: 'SUP-03', titulo: 'El usuario normal no ve estos reportes', negativa: true,
          pasos: [
            'Con un usuario normal de CXC busca «Reporte cuotas» y «Bitacora CxC» en el menú.'
          ],
          espera: [
            'No aparecen: son solo del supervisor de CXC.'
          ]
        }
      ]
    }
  ]
};
