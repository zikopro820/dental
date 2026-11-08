/* =========================================================
   DATOS INICIALES — Dental Cabanillas (tratamientos, productos y ajustes de ejemplo).
   Si conectaste Firebase, todo esto se edita desde el PANEL.
   Este archivo solo se usa como respaldo mientras la base de datos esté vacía.
   ========================================================= */
window.DATOS = {
 "ajustes": {
  "whatsapp": "51987654321",
  "telefono": "+51 987 654 321",
  "direccion": "Av. Arequipa 2450, Lince, Lima",
  "correo": "citas@dentalcabanillas.pe",
  "abre": "9:00",
  "cierra": "20:00",
  "domingoCierra": "",
  "delivery": 10,
  "deliveryGratis": 120,
  "capacidad": 4,
  "turno": 30,
  "razonSocial": "",
  "ruc": "",
  "reciboPie": ""
 },
 "servicios": [
  {
   "id": "evaluacion",
   "cat": "prevencion",
   "n": "Evaluación y diagnóstico",
   "d": "Revisión completa, radiografía digital y plan de tratamiento con presupuesto claro.",
   "p": 50,
   "icon": "search",
   "img": "1663755489920-5e09f66d011a",
   "tipo": "principal",
   "reservable": true,
   "domicilio": false,
   "sesiones": "1 cita",
   "duracion": "30 min",
   "larga": "Es el primer paso para cuidar tu sonrisa. Revisamos dientes, encías y mordida, tomamos una radiografía digital si hace falta y te explicamos con calma lo que encontramos.\n\nSales con un plan de tratamiento por escrito, con precios y opciones de pago en cuotas.",
   "beneficios": [
    "Diagnóstico completo de dientes y encías",
    "Radiografía digital incluida si es necesaria",
    "Presupuesto por escrito, sin sorpresas",
    "Opciones de pago en cuotas"
   ],
   "faq": [
    {
     "q": "¿La evaluación tiene costo?",
     "a": "Sí, S/ 50. Si inicias tu tratamiento ese mismo mes, te lo descontamos."
    },
    {
     "q": "¿Cuánto dura?",
     "a": "Alrededor de 30 minutos."
    }
   ],
   "orden": 1,
   "visible": true
  },
  {
   "id": "limpieza",
   "cat": "prevencion",
   "n": "Limpieza dental (profilaxis)",
   "d": "Eliminamos sarro y manchas con ultrasonido y pulido. Recomendada cada 6 meses.",
   "p": 80,
   "icon": "clean",
   "img": "1681939278218-a755fb2bf2d3",
   "tipo": "principal",
   "reservable": true,
   "domicilio": false,
   "sesiones": "1 cita",
   "duracion": "45 min",
   "larga": "La limpieza profesional elimina el sarro y la placa que el cepillo no alcanza, previene caries y enfermedades de las encías y deja tus dientes más brillantes.\n\nUsamos ultrasonido, pulido con pasta profiláctica y aplicación de flúor.",
   "beneficios": [
    "Elimina sarro y manchas superficiales",
    "Previene caries y sangrado de encías",
    "Aliento más fresco",
    "Incluye aplicación de flúor"
   ],
   "faq": [
    {
     "q": "¿Duele la limpieza?",
     "a": "No. Puedes sentir algo de sensibilidad, pero es una molestia leve."
    },
    {
     "q": "¿Cada cuánto debo hacerla?",
     "a": "Lo ideal es cada 6 meses. Te enviamos un recordatorio por WhatsApp."
    }
   ],
   "orden": 2,
   "visible": true
  },
  {
   "id": "resinas",
   "cat": "prevencion",
   "n": "Curaciones con resina",
   "d": "Tratamos caries con resinas del color de tu diente, sin metal y en una sola cita.",
   "p": 90,
   "icon": "fill",
   "img": "1681939282781-341ac4f61996",
   "tipo": "principal",
   "reservable": true,
   "domicilio": false,
   "sesiones": "1 cita por pieza",
   "duracion": "40 min",
   "larga": "Retiramos la caries y reconstruimos el diente con resina estética del mismo color, para que la curación no se note.",
   "beneficios": [
    "Del mismo color de tu diente",
    "Sin amalgamas ni metal",
    "Lista en una sola cita"
   ],
   "faq": [
    {
     "q": "¿Cuánto dura una resina?",
     "a": "Con buena higiene y controles, entre 5 y 10 años."
    }
   ],
   "orden": 3,
   "visible": true
  },
  {
   "id": "blanqueamiento",
   "cat": "estetica",
   "n": "Blanqueamiento dental",
   "d": "Aclara varios tonos tu sonrisa de forma segura, en consultorio o con kit para casa.",
   "p": 450,
   "icon": "sparkle",
   "img": "1654373535457-383a0a4d00f9",
   "tipo": "principal",
   "reservable": true,
   "domicilio": false,
   "sesiones": "1 a 2 citas",
   "duracion": "60 min",
   "larga": "Aclaramos el color de tus dientes con geles profesionales y protección de encías. Puedes hacerlo en el consultorio o combinarlo con un kit para casa.",
   "beneficios": [
    "Resultados visibles desde la primera sesión",
    "Protegemos tus encías",
    "Combinable con kit para casa"
   ],
   "faq": [
    {
     "q": "¿Daña el esmalte?",
     "a": "No, cuando lo supervisa un dentista. Puede haber sensibilidad pasajera."
    },
    {
     "q": "¿Cuánto dura el resultado?",
     "a": "Entre 1 y 3 años, según tus hábitos (café, cigarro, vino)."
    }
   ],
   "orden": 4,
   "visible": true
  },
  {
   "id": "carillas",
   "cat": "estetica",
   "n": "Carillas de resina y porcelana",
   "d": "Corrige forma, color y tamaño de tus dientes para una sonrisa armónica.",
   "p": 350,
   "icon": "veneer",
   "img": "1785860817740-c95735ba03b1",
   "tipo": "principal",
   "reservable": true,
   "domicilio": false,
   "sesiones": "2 a 3 citas",
   "duracion": "60 a 90 min",
   "larga": "Las carillas son láminas delgadas que se adhieren a la cara visible del diente. Corrigen manchas, espacios, dientes desgastados o de forma irregular.",
   "beneficios": [
    "Diseño de sonrisa personalizado",
    "Resina (económica) o porcelana (más duradera)",
    "Resultado natural"
   ],
   "faq": [
    {
     "q": "¿El precio es por diente?",
     "a": "Sí, el precio es por pieza. En la evaluación te damos el presupuesto completo."
    }
   ],
   "orden": 5,
   "visible": true
  },
  {
   "id": "brackets",
   "cat": "ortodoncia",
   "n": "Ortodoncia con brackets",
   "d": "Brackets metálicos o estéticos para alinear tus dientes. Pagas en cuotas mensuales.",
   "p": 2500,
   "icon": "brace",
   "img": "1777446899714-c26de766dffd",
   "tipo": "principal",
   "reservable": true,
   "domicilio": false,
   "sesiones": "Controles mensuales",
   "duracion": "18 a 24 meses",
   "larga": "Alineamos tus dientes y corregimos la mordida con brackets metálicos o de zafiro (estéticos). Incluye controles mensuales y retenedores al terminar.",
   "beneficios": [
    "Brackets metálicos o estéticos",
    "Controles mensuales incluidos",
    "Pago en cuotas sin intereses",
    "Retenedores al finalizar"
   ],
   "faq": [
    {
     "q": "¿Puedo pagar en cuotas?",
     "a": "Sí. Una cuota inicial y el resto en cuotas mensuales, sin intereses."
    },
    {
     "q": "¿Hay edad límite?",
     "a": "No. Tratamos niños, adolescentes y adultos."
    }
   ],
   "orden": 6,
   "visible": true
  },
  {
   "id": "alineadores",
   "cat": "ortodoncia",
   "n": "Alineadores invisibles",
   "d": "Ortodoncia transparente y removible. Casi nadie nota que la usas.",
   "p": 6500,
   "icon": "aligner",
   "img": "1777793636393-a0fec488f3fb",
   "tipo": "principal",
   "reservable": true,
   "domicilio": false,
   "sesiones": "Controles cada 6 a 8 semanas",
   "duracion": "6 a 18 meses",
   "larga": "Juegos de alineadores transparentes hechos a tu medida que mueven tus dientes poco a poco. Te los quitas para comer y cepillarte.",
   "beneficios": [
    "Transparentes y cómodos",
    "Removibles para comer",
    "Simulación digital del resultado",
    "Pago en cuotas"
   ],
   "faq": [
    {
     "q": "¿Cuántas horas al día se usan?",
     "a": "Entre 20 y 22 horas al día para obtener el resultado planeado."
    }
   ],
   "orden": 7,
   "visible": true
  },
  {
   "id": "endodoncia",
   "cat": "especialidades",
   "n": "Endodoncia (tratamiento de conducto)",
   "d": "Salvamos tu diente cuando el nervio está dañado o infectado, sin dolor.",
   "p": 350,
   "icon": "root",
   "img": "1588776814546-daab30f310ce",
   "tipo": "principal",
   "reservable": true,
   "domicilio": false,
   "sesiones": "1 a 2 citas",
   "duracion": "60 a 90 min",
   "larga": "Cuando la caries llega al nervio, limpiamos y sellamos los conductos del diente para eliminar la infección y conservarlo.\n\nSe realiza con anestesia local: el procedimiento no duele.",
   "beneficios": [
    "Conservas tu diente natural",
    "Con anestesia: sin dolor",
    "Radiografías de control incluidas"
   ],
   "faq": [
    {
     "q": "¿Después necesito corona?",
     "a": "En muelas casi siempre se recomienda una corona para protegerla."
    }
   ],
   "orden": 8,
   "visible": true
  },
  {
   "id": "extraccion",
   "cat": "especialidades",
   "n": "Extracciones y cirugía",
   "d": "Extracciones simples y de muelas del juicio con anestesia y cuidados posteriores.",
   "p": 120,
   "icon": "pliers",
   "img": "1588776814546-1ffcf47267a5",
   "tipo": "principal",
   "reservable": true,
   "domicilio": false,
   "sesiones": "1 cita",
   "duracion": "30 a 60 min",
   "larga": "Realizamos extracciones simples y quirúrgicas (incluidas las muelas del juicio) con anestesia local y te damos indicaciones y receta para una recuperación tranquila.",
   "beneficios": [
    "Anestesia local",
    "Indicaciones y receta incluidas",
    "Control posterior"
   ],
   "faq": [
    {
     "q": "¿Cuándo hay que sacar las muelas del juicio?",
     "a": "Cuando no tienen espacio, causan dolor o dañan a los dientes vecinos. Lo vemos con una radiografía."
    }
   ],
   "orden": 9,
   "visible": true
  },
  {
   "id": "implantes",
   "cat": "especialidades",
   "n": "Implantes dentales",
   "d": "Reemplaza dientes perdidos con implantes de titanio que se ven y se sienten naturales.",
   "p": 2900,
   "icon": "implant",
   "img": "1593022356769-11f762e25ed9",
   "tipo": "principal",
   "reservable": true,
   "domicilio": false,
   "sesiones": "3 a 4 citas",
   "duracion": "3 a 6 meses en total",
   "larga": "El implante es una raíz de titanio que se coloca en el hueso y sobre ella una corona. Es la forma más natural y duradera de reponer un diente.",
   "beneficios": [
    "Se ve y funciona como un diente natural",
    "No desgasta los dientes vecinos",
    "Pago en cuotas"
   ],
   "faq": [
    {
     "q": "¿Duele colocar un implante?",
     "a": "Se hace con anestesia local. Después puede haber molestias leves por unos días."
    }
   ],
   "orden": 10,
   "visible": true
  },
  {
   "id": "protesis",
   "cat": "especialidades",
   "n": "Coronas y prótesis",
   "d": "Coronas de porcelana o zirconio y prótesis fijas o removibles.",
   "p": 600,
   "icon": "crown",
   "img": "",
   "tipo": "principal",
   "reservable": true,
   "domicilio": false,
   "sesiones": "2 a 3 citas",
   "duracion": "2 a 3 semanas",
   "larga": "Restauramos dientes muy dañados con coronas y reponemos piezas perdidas con prótesis fijas o removibles hechas a medida.",
   "beneficios": [
    "Porcelana o zirconio",
    "Hechas a tu medida",
    "Devuelven la función al masticar"
   ],
   "faq": [],
   "orden": 11,
   "visible": true
  },
  {
   "id": "odontopediatria",
   "cat": "ninos",
   "n": "Odontopediatría",
   "d": "Atención dental para niños en un ambiente amigable: controles, sellantes y flúor.",
   "p": 60,
   "icon": "kid",
   "img": "1609840113564-ab4aba4956c4",
   "tipo": "principal",
   "reservable": true,
   "domicilio": false,
   "sesiones": "1 cita",
   "duracion": "30 min",
   "larga": "Cuidamos los dientes de los más pequeños con paciencia y cariño: controles, limpieza, flúor, sellantes y tratamiento de caries de leche.",
   "beneficios": [
    "Dentista especialista en niños",
    "Ambiente amigable, sin miedo",
    "Prevención con flúor y sellantes"
   ],
   "faq": [
    {
     "q": "¿Desde qué edad debe ir mi hijo al dentista?",
     "a": "Desde que sale su primer diente o al año de edad."
    }
   ],
   "orden": 12,
   "visible": true
  },
  {
   "id": "panoramica",
   "cat": "prevencion",
   "n": "Radiografía panorámica",
   "d": "Imagen digital de toda la boca",
   "p": 60,
   "icon": "xray",
   "img": "",
   "tipo": "adicional",
   "reservable": true,
   "domicilio": false,
   "sesiones": "1 cita",
   "duracion": "10 min",
   "larga": "",
   "beneficios": [],
   "faq": [],
   "orden": 13,
   "visible": true
  },
  {
   "id": "sellantes",
   "cat": "ninos",
   "n": "Sellantes y flúor",
   "d": "Protección contra caries para niños",
   "p": 40,
   "icon": "shield",
   "img": "",
   "tipo": "adicional",
   "reservable": true,
   "domicilio": false,
   "sesiones": "1 cita",
   "duracion": "20 min",
   "larga": "",
   "beneficios": [],
   "faq": [],
   "orden": 14,
   "visible": true
  },
  {
   "id": "guarda",
   "cat": "especialidades",
   "n": "Guarda para bruxismo",
   "d": "Protege tus dientes si los aprietas de noche",
   "p": 250,
   "icon": "moon",
   "img": "",
   "tipo": "adicional",
   "reservable": true,
   "domicilio": false,
   "sesiones": "2 citas",
   "duracion": "1 semana",
   "larga": "",
   "beneficios": [],
   "faq": [],
   "orden": 15,
   "visible": true
  },
  {
   "id": "urgencias",
   "cat": "especialidades",
   "n": "Urgencias dentales",
   "d": "Dolor, golpes o dientes rotos: te atendemos el mismo día",
   "p": 0,
   "icon": "siren",
   "img": "",
   "tipo": "adicional",
   "reservable": false,
   "domicilio": false,
   "sesiones": "",
   "duracion": "",
   "larga": "",
   "beneficios": [],
   "faq": [],
   "orden": 16,
   "visible": true
  }
 ],
 "productos": [
  {
   "n": "Cepillo eléctrico recargable",
   "p": 189.9,
   "old": 229.9,
   "cat": "cepillos",
   "tag": "Oferta",
   "img": "1760088348211-9cb4e450835e",
   "d": "Limpieza sónica, temporizador de 2 minutos y batería para 3 semanas.",
   "destacado": true,
   "esp": "todos",
   "id": "p1",
   "orden": 1,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Cepillos de bambú (pack x4)",
   "p": 24.9,
   "cat": "cepillos",
   "tag": "Nuevo",
   "img": "1777446523856-e7acffa844a7",
   "d": "Biodegradables, cerdas suaves con carbón activado.",
   "destacado": true,
   "old": 0,
   "esp": "todos",
   "id": "p2",
   "orden": 2,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Cepillo ultra suave para encías sensibles",
   "p": 14.9,
   "cat": "cepillos",
   "tag": "Recomendado",
   "img": "1625834319124-345137437603",
   "d": "Más de 5,000 filamentos finos. Ideal después de una limpieza.",
   "old": 0,
   "destacado": false,
   "esp": "todos",
   "id": "p3",
   "orden": 3,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Pasta dental con flúor 1450 ppm",
   "p": 12.9,
   "cat": "pastas",
   "tag": "Recomendado",
   "img": "1693692273603-3b9e13789298",
   "d": "Protección anticaries diaria para toda la familia.",
   "destacado": true,
   "old": 0,
   "esp": "todos",
   "id": "p4",
   "orden": 4,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Pasta para dientes sensibles",
   "p": 18.9,
   "cat": "pastas",
   "img": "1775642549786-813dc015a495",
   "d": "Alivia la sensibilidad al frío y al calor desde la primera semana.",
   "old": 0,
   "tag": "",
   "destacado": false,
   "esp": "todos",
   "id": "p5",
   "orden": 5,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Enjuague bucal sin alcohol 500 ml",
   "p": 22.9,
   "cat": "pastas",
   "img": "1594178990090-ca641059a506",
   "d": "Con flúor y cloruro de cetilpiridinio. No arde.",
   "old": 0,
   "tag": "",
   "destacado": false,
   "esp": "todos",
   "id": "p6",
   "orden": 6,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Hilo dental encerado 50 m",
   "p": 9.9,
   "cat": "hilo",
   "img": "1589365252845-092198ba5334",
   "d": "Se desliza fácil entre dientes juntos.",
   "old": 0,
   "tag": "",
   "destacado": false,
   "esp": "todos",
   "id": "p7",
   "orden": 7,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Cepillos interdentales (x6)",
   "p": 16.9,
   "cat": "hilo",
   "img": "1772911141524-d3dc8b1cc97e",
   "d": "Para limpiar entre dientes, puentes e implantes.",
   "old": 0,
   "tag": "",
   "destacado": false,
   "esp": "todos",
   "id": "p8",
   "orden": 8,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Kit de blanqueamiento para casa",
   "p": 249.0,
   "old": 299.0,
   "cat": "blanqueamiento",
   "tag": "Oferta",
   "img": "1564420228450-d9a5bc8d6565",
   "d": "Gel profesional y férulas a medida. Supervisado por tu dentista.",
   "destacado": true,
   "esp": "todos",
   "id": "p9",
   "orden": 9,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Estuche para alineadores",
   "p": 29.9,
   "cat": "ortodoncia",
   "img": "1777793636393-a0fec488f3fb",
   "d": "Ventilado y compacto, para llevar tus alineadores a todos lados.",
   "old": 0,
   "tag": "",
   "destacado": false,
   "esp": "todos",
   "id": "p10",
   "orden": 10,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Cera para brackets",
   "p": 8.9,
   "cat": "ortodoncia",
   "img": "1777446899714-c26de766dffd",
   "d": "Evita roces y llagas los primeros días con brackets.",
   "old": 0,
   "tag": "",
   "destacado": false,
   "esp": "todos",
   "id": "p11",
   "orden": 11,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Cepillo de ortodoncia",
   "p": 15.9,
   "cat": "ortodoncia",
   "img": "1553691158-91a7f9183156",
   "d": "Cerdas en V para limpiar alrededor de los brackets.",
   "old": 0,
   "tag": "",
   "destacado": false,
   "esp": "todos",
   "id": "p12",
   "orden": 12,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Cepillo infantil (3 a 8 años)",
   "p": 11.9,
   "cat": "ninos",
   "tag": "Nuevo",
   "img": "1609840113564-ab4aba4956c4",
   "d": "Mango antideslizante y cabezal pequeño para boquitas pequeñas.",
   "old": 0,
   "destacado": false,
   "esp": "todos",
   "id": "p13",
   "orden": 13,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Pasta infantil sabor fresa",
   "p": 10.9,
   "cat": "ninos",
   "img": "",
   "d": "Con flúor en la dosis adecuada para niños.",
   "old": 0,
   "tag": "",
   "destacado": false,
   "esp": "todos",
   "id": "p14",
   "orden": 14,
   "visible": true,
   "stock": "disponible"
  },
  {
   "n": "Protector bucal deportivo",
   "p": 39.9,
   "cat": "ortodoncia",
   "img": "",
   "d": "Protege tus dientes en fútbol, básquet y artes marciales.",
   "old": 0,
   "tag": "",
   "destacado": false,
   "esp": "todos",
   "id": "p15",
   "orden": 15,
   "visible": true,
   "stock": "disponible"
  }
 ],
 "web": {
  "marca": {
   "logo": "",
   "nombre1": "Dental",
   "nombre2": " Cabanillas",
   "eslogan": "Odontología integral",
   "color1": "#0b6e99",
   "color2": "#16b3a3"
  },
  "portada": {
   "etiqueta": "Odontología integral · Lince, Lima",
   "titulo": "Tu mejor sonrisa",
   "tituloColor": "empieza aquí",
   "texto": "Dentistas especialistas, equipos digitales y precios claros. Reserva tu cita online y sigue tu tratamiento desde el celular con tu código personal.",
   "foto": "1777331903190-341a3dd0441b",
   "cifras": [
    {
     "n": "15 años",
     "t": "cuidando sonrisas"
    },
    {
     "n": "+5,000",
     "t": "pacientes felices"
    },
    {
     "n": "0%",
     "t": "interés en cuotas"
    }
   ]
  },
  "nosotros": {
   "titulo": "Una familia de dentistas",
   "tituloColor": "cuidando a la tuya",
   "foto": "1629909613654-28e377c37b09",
   "texto": "Dental Cabanillas nació en 2011 como un consultorio familiar. Hoy somos un equipo de especialistas con radiografía digital, esterilización certificada y un trato cercano: te explicamos todo antes de empezar.",
   "puntos": [
    "Especialistas en cada área: ortodoncia, endodoncia, implantes y niños",
    "Radiografía digital y esterilización con autoclave",
    "Presupuesto por escrito y pagos en cuotas",
    "Historial, citas y pagos en tu celular con Mi Sonrisa"
   ]
  },
  "equipo": [
   {
    "n": "Dr. Luis Cabanillas",
    "cargo": "Rehabilitación oral e implantes",
    "d": "Director clínico · 18 años de experiencia en implantes y rehabilitación.",
    "foto": ""
   },
   {
    "n": "Dra. Andrea Cabanillas",
    "cargo": "Ortodoncia y estética",
    "d": "Especialista en ortodoncia con brackets y alineadores invisibles.",
    "foto": ""
   },
   {
    "n": "Dr. Martín Rojas",
    "cargo": "Endodoncia",
    "d": "Endodoncista: tratamientos de conducto con microscopio.",
    "foto": ""
   },
   {
    "n": "Dra. Fiorella Quispe",
    "cargo": "Odontopediatría",
    "d": "Odontopediatra: hace que los niños pierdan el miedo al dentista.",
    "foto": ""
   }
  ],
  "testimonios": [
   {
    "q": "Tenía miedo al dentista y aquí me explicaron todo con paciencia. Mi endodoncia no dolió nada y pude pagar en dos partes.",
    "n": "Rosa Huamán",
    "r": "Paciente de endodoncia"
   },
   {
    "q": "Llevo mis brackets con la Dra. Andrea y desde Mi Sonrisa veo cuántas cuotas me faltan y cuándo es mi control. ¡Súper práctico!",
    "n": "Diego Paredes",
    "r": "Paciente de ortodoncia"
   },
   {
    "q": "Mis hijos ya no lloran para ir al dentista. La Dra. Fiorella es un amor y el consultorio es muy limpio.",
    "n": "Carmen Salazar",
    "r": "Mamá de Mateo y Lucía"
   }
  ],
  "redes": {
   "facebook": "",
   "instagram": "",
   "tiktok": ""
  },
  "emergencias": true
 },
 "categorias": {
  "productos": [
   {
    "id": "cepillos",
    "n": "Cepillos",
    "icon": "brush",
    "orden": 1,
    "visible": true
   },
   {
    "id": "pastas",
    "n": "Pastas y enjuagues",
    "icon": "paste",
    "orden": 2,
    "visible": true
   },
   {
    "id": "hilo",
    "n": "Hilo e interdentales",
    "icon": "floss",
    "orden": 3,
    "visible": true
   },
   {
    "id": "blanqueamiento",
    "n": "Blanqueamiento",
    "icon": "sparkle",
    "orden": 4,
    "visible": true
   },
   {
    "id": "ortodoncia",
    "n": "Ortodoncia",
    "icon": "brace",
    "orden": 5,
    "visible": true
   },
   {
    "id": "ninos",
    "n": "Niños",
    "icon": "kid",
    "orden": 6,
    "visible": true
   }
  ],
  "servicios": [
   {
    "id": "prevencion",
    "n": "Prevención y limpieza",
    "icon": "clean",
    "orden": 1,
    "visible": true
   },
   {
    "id": "estetica",
    "n": "Estética dental",
    "icon": "sparkle",
    "orden": 2,
    "visible": true
   },
   {
    "id": "ortodoncia",
    "n": "Ortodoncia",
    "icon": "brace",
    "orden": 3,
    "visible": true
   },
   {
    "id": "especialidades",
    "n": "Endodoncia, cirugía e implantes",
    "icon": "implant",
    "orden": 4,
    "visible": true
   },
   {
    "id": "ninos",
    "n": "Odontopediatría",
    "icon": "kid",
    "orden": 5,
    "visible": true
   }
  ]
 },
 "paginas": {
  "menu": [
   {
    "id": "inicio",
    "n": "Inicio",
    "visible": true
   },
   {
    "id": "tratamientos",
    "n": "Tratamientos",
    "visible": true
   },
   {
    "id": "tienda",
    "n": "Tienda",
    "visible": true
   },
   {
    "id": "citas",
    "n": "Reservar cita",
    "visible": true
   },
   {
    "id": "mi-sonrisa",
    "n": "Mi Sonrisa",
    "visible": true
   },
   {
    "id": "nosotros",
    "n": "Nosotros",
    "visible": true
   },
   {
    "id": "contacto",
    "n": "Contacto",
    "visible": true
   }
  ],
  "encabezados": {
   "tratamientos": {
    "pill": "Tratamientos",
    "titulo": "Tratamientos dentales",
    "tituloColor": "para toda la familia",
    "texto": "Precios referenciales desde. El presupuesto final lo recibes por escrito después de tu evaluación."
   },
   "tienda": {
    "pill": "Tienda",
    "titulo": "Productos para",
    "tituloColor": "tu higiene dental",
    "texto": "Los mismos productos que recomendamos en consulta. Agrega al carrito y pide por WhatsApp: recojo en el consultorio o delivery."
   },
   "citas": {
    "pill": "Citas online",
    "titulo": "Reserva tu",
    "tituloColor": "cita dental",
    "texto": "Elige el tratamiento, el día y un horario libre. Tu cita queda confirmada al instante."
   },
   "nosotros": {
    "pill": "Nosotros",
    "titulo": "Cuidamos sonrisas",
    "tituloColor": "desde 2011",
    "texto": "Un equipo de especialistas con trato cercano y tecnología digital."
   },
   "contacto": {
    "pill": "Contacto",
    "titulo": "Estamos para",
    "tituloColor": "ayudarte",
    "texto": "Visítanos, llámanos o escríbenos por WhatsApp. Si tienes dolor o un golpe, te atendemos el mismo día."
   },
   "privacidad": {
    "pill": "Privacidad",
    "titulo": "Aviso de",
    "tituloColor": "privacidad",
    "texto": "Cómo cuidamos tus datos personales y de salud."
   }
  },
  "inicio": [
   {
    "id": "accesos",
    "n": "Accesos rápidos",
    "visible": true
   },
   {
    "id": "servicios",
    "n": "Tratamientos",
    "pill": "Tratamientos",
    "titulo": "Todo para tu sonrisa",
    "tituloColor": "en un solo lugar",
    "texto": "Desde una limpieza hasta implantes, con especialistas en cada área.",
    "visible": true
   },
   {
    "id": "antes",
    "n": "Antes y después",
    "pill": "Resultados",
    "titulo": "Sonrisas que",
    "tituloColor": "cambian vidas",
    "texto": "Desliza para comparar. Cada tratamiento se planifica a la medida de cada paciente.",
    "visible": true
   },
   {
    "id": "portal",
    "n": "Portal Mi Sonrisa",
    "pill": "Mi Sonrisa",
    "titulo": "Tu tratamiento,",
    "tituloColor": "en tu celular",
    "texto": "Con tu código personal ves tus citas, tu plan de tratamiento, tu odontograma, tus cuotas y descargas recibos y recetas.",
    "visible": true
   },
   {
    "id": "cuotas",
    "n": "Pago en cuotas",
    "pill": "Facilidades",
    "titulo": "Paga tu tratamiento",
    "tituloColor": "en cuotas",
    "texto": "Ortodoncia, implantes y rehabilitación con cuota inicial y pagos mensuales sin intereses.",
    "visible": true
   },
   {
    "id": "emergencias",
    "n": "Aviso de urgencias",
    "titulo": "¿Dolor de muela o un diente roto?",
    "texto": "Te atendemos el mismo día. Escríbenos y te damos la primera cita disponible.",
    "visible": true
   },
   {
    "id": "tienda",
    "n": "Productos destacados",
    "pill": "Tienda",
    "titulo": "Lo que recomiendan",
    "tituloColor": "nuestros dentistas",
    "texto": "Cepillos, pastas, hilo dental y kits de blanqueamiento. Pide por WhatsApp.",
    "visible": true
   },
   {
    "id": "pasos",
    "n": "Cómo reservar (pasos)",
    "pill": "Así de fácil",
    "titulo": "Tu cita en",
    "tituloColor": "4 pasos",
    "texto": "",
    "visible": true
   },
   {
    "id": "testimonios",
    "n": "Testimonios",
    "pill": "Opiniones",
    "titulo": "Pacientes que",
    "tituloColor": "vuelven a sonreír",
    "texto": "Más de 5,000 pacientes confían en nosotros.",
    "visible": true
   },
   {
    "id": "faq",
    "n": "Preguntas frecuentes",
    "pill": "Dudas",
    "titulo": "Preguntas",
    "tituloColor": "frecuentes",
    "texto": "",
    "visible": true
   },
   {
    "id": "cta",
    "n": "Llamado final",
    "titulo": "Agenda tu evaluación hoy",
    "texto": "Diagnóstico completo, radiografía y presupuesto por escrito. Reserva en menos de un minuto.",
    "visible": true
   }
  ],
  "pie": {
   "texto": "Odontología integral para toda la familia. Especialistas, tecnología digital y tu tratamiento siempre a la mano con Mi Sonrisa."
  },
  "extras": []
 },
 "doctores": [
  {
   "id": "luis",
   "n": "Dr. Luis Cabanillas",
   "esp": "Rehabilitación oral e implantes",
   "color": "#0b6e99",
   "dias": [
    1,
    2,
    3,
    4,
    5,
    6
   ],
   "desde": "9:00",
   "hasta": "20:00",
   "foto": "",
   "activo": true,
   "ausencias": []
  },
  {
   "id": "andrea",
   "n": "Dra. Andrea Cabanillas",
   "esp": "Ortodoncia y estética",
   "color": "#16b3a3",
   "dias": [
    1,
    2,
    3,
    4,
    5,
    6
   ],
   "desde": "9:00",
   "hasta": "18:00",
   "foto": "",
   "activo": true,
   "ausencias": []
  },
  {
   "id": "martin",
   "n": "Dr. Martín Rojas",
   "esp": "Endodoncia",
   "color": "#7c5cf2",
   "dias": [
    1,
    3,
    5
   ],
   "desde": "14:00",
   "hasta": "20:00",
   "foto": "",
   "activo": true,
   "ausencias": []
  },
  {
   "id": "fiorella",
   "n": "Dra. Fiorella Quispe",
   "esp": "Odontopediatría",
   "color": "#f2795c",
   "dias": [
    2,
    4,
    6
   ],
   "desde": "9:00",
   "hasta": "15:00",
   "foto": "",
   "activo": true,
   "ausencias": []
  }
 ],
 "odonto": [
  {
   "id": "sano",
   "n": "Sano",
   "c": "#ffffff"
  },
  {
   "id": "caries",
   "n": "Caries",
   "c": "#ef4444"
  },
  {
   "id": "resina",
   "n": "Curación / resina",
   "c": "#3b82f6"
  },
  {
   "id": "endodoncia",
   "n": "Endodoncia",
   "c": "#8b5cf6"
  },
  {
   "id": "corona",
   "n": "Corona",
   "c": "#f59e0b"
  },
  {
   "id": "implante",
   "n": "Implante",
   "c": "#14b8a6"
  },
  {
   "id": "sellante",
   "n": "Sellante",
   "c": "#22c55e"
  },
  {
   "id": "fractura",
   "n": "Fractura",
   "c": "#fb923c"
  },
  {
   "id": "extraer",
   "n": "Extracción indicada",
   "c": "#fecaca"
  },
  {
   "id": "ausente",
   "n": "Ausente",
   "c": "#cbd5e1"
  }
 ],
 "textos": [
  {
   "k": "pie.c1",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Título columna 1",
   "v": "Tratamientos"
  },
  {
   "k": "pie.c1a",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Enlace 1",
   "v": "Limpieza dental"
  },
  {
   "k": "pie.c1b",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Enlace 2",
   "v": "Ortodoncia"
  },
  {
   "k": "pie.c1c",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Enlace 3",
   "v": "Implantes"
  },
  {
   "k": "pie.c1d",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Enlace 4",
   "v": "Blanqueamiento"
  },
  {
   "k": "pie.c2",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Título columna 2",
   "v": "Pacientes"
  },
  {
   "k": "pie.c2a",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Enlace 1",
   "v": "Reservar cita"
  },
  {
   "k": "pie.c2b",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Enlace 2",
   "v": "Mi Sonrisa"
  },
  {
   "k": "pie.c2c",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Enlace 3",
   "v": "Tienda"
  },
  {
   "k": "pie.c2d",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Enlace 4",
   "v": "Aviso de privacidad"
  },
  {
   "k": "pie.c3",
   "pag": "general",
   "g": "Columnas del pie",
   "l": "Título columna 3",
   "v": "Visítanos"
  },
  {
   "k": "em.btn",
   "pag": "inicio",
   "g": "Aviso de urgencias",
   "l": "Texto del botón",
   "v": "Urgencias:"
  },
  {
   "k": "cta.b1",
   "pag": "inicio",
   "g": "Llamado final",
   "l": "Botón 1",
   "v": "Reservar cita"
  },
  {
   "k": "cta.b2",
   "pag": "inicio",
   "g": "Llamado final",
   "l": "Botón 2",
   "v": "Entrar a Mi Sonrisa"
  },
  {
   "k": "top.emerg",
   "pag": "general",
   "g": "Barra superior",
   "l": "Texto de urgencias",
   "v": "Urgencias dentales:"
  },
  {
   "k": "top.cuotas",
   "pag": "general",
   "g": "Barra superior",
   "l": "Texto de la derecha",
   "v": "Pago en cuotas sin intereses"
  },
  {
   "k": "nav.cta",
   "pag": "general",
   "g": "Menú",
   "l": "Botón del menú",
   "v": "Reservar cita"
  },
  {
   "k": "ini.b1",
   "pag": "inicio",
   "g": "Portada",
   "l": "Botón 1",
   "v": "Reservar evaluación"
  },
  {
   "k": "ini.b2",
   "pag": "inicio",
   "g": "Portada",
   "l": "Botón 2",
   "v": "Ver tratamientos"
  },
  {
   "k": "ini.f1t",
   "pag": "inicio",
   "g": "Tarjetas sobre la foto",
   "l": "Tarjeta 1 · título",
   "v": "Evaluación + radiografía"
  },
  {
   "k": "ini.f1s",
   "pag": "inicio",
   "g": "Tarjetas sobre la foto",
   "l": "Tarjeta 1 · texto",
   "v": "Desde S/ 50"
  },
  {
   "k": "ini.f2t",
   "pag": "inicio",
   "g": "Tarjetas sobre la foto",
   "l": "Tarjeta 2 · título",
   "v": "Cita confirmada"
  },
  {
   "k": "ini.f2s",
   "pag": "inicio",
   "g": "Tarjetas sobre la foto",
   "l": "Tarjeta 2 · texto",
   "v": "Sáb · 10:30 h · Limpieza"
  },
  {
   "k": "ini.f3t",
   "pag": "inicio",
   "g": "Tarjetas sobre la foto",
   "l": "Tarjeta 3 · título",
   "v": "Cuotas sin intereses"
  },
  {
   "k": "ini.f3s",
   "pag": "inicio",
   "g": "Tarjetas sobre la foto",
   "l": "Tarjeta 3 · texto",
   "v": "Ortodoncia e implantes"
  },
  {
   "k": "ini.a1t",
   "pag": "inicio",
   "g": "Accesos rápidos",
   "l": "Acceso 1 · título",
   "v": "Reservar cita"
  },
  {
   "k": "ini.a1s",
   "pag": "inicio",
   "g": "Accesos rápidos",
   "l": "Acceso 1 · texto",
   "v": "Elige día y hora libre"
  },
  {
   "k": "ini.a2t",
   "pag": "inicio",
   "g": "Accesos rápidos",
   "l": "Acceso 2 · título",
   "v": "Mi Sonrisa"
  },
  {
   "k": "ini.a2s",
   "pag": "inicio",
   "g": "Accesos rápidos",
   "l": "Acceso 2 · texto",
   "v": "Tu tratamiento con tu código"
  },
  {
   "k": "ini.a3t",
   "pag": "inicio",
   "g": "Accesos rápidos",
   "l": "Acceso 3 · título",
   "v": "Tratamientos"
  },
  {
   "k": "ini.a3s",
   "pag": "inicio",
   "g": "Accesos rápidos",
   "l": "Acceso 3 · texto",
   "v": "Precios desde"
  },
  {
   "k": "ini.a4t",
   "pag": "inicio",
   "g": "Accesos rápidos",
   "l": "Acceso 4 · título",
   "v": "Urgencias"
  },
  {
   "k": "ini.a4s",
   "pag": "inicio",
   "g": "Accesos rápidos",
   "l": "Acceso 4 · texto",
   "v": "Atención el mismo día"
  },
  {
   "k": "ini.svbtn",
   "pag": "inicio",
   "g": "Tratamientos",
   "l": "Texto del botón",
   "v": "Ver todos los tratamientos"
  },
  {
   "k": "ini.ba1",
   "pag": "inicio",
   "g": "Antes y después",
   "l": "Punto 1",
   "v": "Diseño de sonrisa digital antes de empezar"
  },
  {
   "k": "ini.ba2",
   "pag": "inicio",
   "g": "Antes y después",
   "l": "Punto 2",
   "v": "Blanqueamiento, carillas y ortodoncia"
  },
  {
   "k": "ini.ba3",
   "pag": "inicio",
   "g": "Antes y después",
   "l": "Punto 3",
   "v": "Resultados naturales, a tu medida"
  },
  {
   "k": "ini.babtn",
   "pag": "inicio",
   "g": "Antes y después",
   "l": "Texto del botón",
   "v": "Quiero mi evaluación"
  },
  {
   "k": "ini.baA",
   "pag": "inicio",
   "g": "Antes y después",
   "l": "Etiqueta izquierda",
   "v": "Antes"
  },
  {
   "k": "ini.baD",
   "pag": "inicio",
   "g": "Antes y después",
   "l": "Etiqueta derecha",
   "v": "Después"
  },
  {
   "k": "ini.baN",
   "pag": "inicio",
   "g": "Antes y después",
   "l": "Nota",
   "v": "Imagen referencial"
  },
  {
   "k": "ini.p1t",
   "pag": "inicio",
   "g": "Portal Mi Sonrisa",
   "l": "Punto 1 · título",
   "v": "Tus próximas citas"
  },
  {
   "k": "ini.p1s",
   "pag": "inicio",
   "g": "Portal Mi Sonrisa",
   "l": "Punto 1 · texto",
   "v": "Día, hora y dentista que te atiende, con cuenta regresiva."
  },
  {
   "k": "ini.p2t",
   "pag": "inicio",
   "g": "Portal Mi Sonrisa",
   "l": "Punto 2 · título",
   "v": "Odontograma y plan de tratamiento"
  },
  {
   "k": "ini.p2s",
   "pag": "inicio",
   "g": "Portal Mi Sonrisa",
   "l": "Punto 2 · texto",
   "v": "Mira el estado de cada diente y cuánto avanzaste."
  },
  {
   "k": "ini.p3t",
   "pag": "inicio",
   "g": "Portal Mi Sonrisa",
   "l": "Punto 3 · título",
   "v": "Cuotas y pagos"
  },
  {
   "k": "ini.p3s",
   "pag": "inicio",
   "g": "Portal Mi Sonrisa",
   "l": "Punto 3 · texto",
   "v": "Cuánto pagaste, cuánto falta y cuándo vence tu cuota."
  },
  {
   "k": "ini.p4t",
   "pag": "inicio",
   "g": "Portal Mi Sonrisa",
   "l": "Punto 4 · título",
   "v": "Recibos y recetas en PDF"
  },
  {
   "k": "ini.p4s",
   "pag": "inicio",
   "g": "Portal Mi Sonrisa",
   "l": "Punto 4 · texto",
   "v": "Descárgalos cuando los necesites."
  },
  {
   "k": "ini.pbtn",
   "pag": "inicio",
   "g": "Portal Mi Sonrisa",
   "l": "Texto del botón",
   "v": "Probar con un código demo"
  },
  {
   "k": "ini.q1t",
   "pag": "inicio",
   "g": "Pago en cuotas",
   "l": "Plan 1 · nombre",
   "v": "Ortodoncia con brackets"
  },
  {
   "k": "ini.q1p",
   "pag": "inicio",
   "g": "Pago en cuotas",
   "l": "Plan 1 · precio",
   "v": "S/ 150"
  },
  {
   "k": "ini.q1s",
   "pag": "inicio",
   "g": "Pago en cuotas",
   "l": "Plan 1 · detalle del precio",
   "v": "/ mes"
  },
  {
   "k": "ini.q1d",
   "pag": "inicio",
   "g": "Pago en cuotas",
   "l": "Plan 1 · texto",
   "v": "Inicial S/ 500 · controles incluidos"
  },
  {
   "k": "ini.q2tag",
   "pag": "inicio",
   "g": "Pago en cuotas",
   "l": "Plan 2 · etiqueta",
   "v": "Más elegido"
  },
  {
   "k": "ini.q2t",
   "pag": "inicio",
   "g": "Pago en cuotas",
   "l": "Plan 2 · nombre",
   "v": "Implante dental"
  },
  {
   "k": "ini.q2p",
   "pag": "inicio",
   "g": "Pago en cuotas",
   "l": "Plan 2 · precio",
   "v": "S/ 290"
  },
  {
   "k": "ini.q2s",
   "pag": "inicio",
   "g": "Pago en cuotas",
   "l": "Plan 2 · detalle del precio",
   "v": "/ mes"
  },
  {
   "k": "ini.q2d",
   "pag": "inicio",
   "g": "Pago en cuotas",
   "l": "Plan 2 · texto",
   "v": "10 cuotas · corona incluida"
  },
  {
   "k": "ini.q3t",
   "pag": "inicio",
   "g": "Pago en cuotas",
   "l": "Plan 3 · nombre",
   "v": "Alineadores invisibles"
  },
  {
   "k": "ini.q3p",
   "pag": "inicio",
   "g": "Pago en cuotas",
   "l": "Plan 3 · precio",
   "v": "S/ 450"
  },
  {
   "k": "ini.q3s",
   "pag": "inicio",
   "g": "Pago en cuotas",
   "l": "Plan 3 · detalle del precio",
   "v": "/ mes"
  },
  {
   "k": "ini.q3d",
   "pag": "inicio",
   "g": "Pago en cuotas",
   "l": "Plan 3 · texto",
   "v": "Simulación digital incluida"
  },
  {
   "k": "ini.tibtn",
   "pag": "inicio",
   "g": "Productos destacados",
   "l": "Texto del botón",
   "v": "Ir a la tienda"
  },
  {
   "k": "ini.s1t",
   "pag": "inicio",
   "g": "Cómo reservar (pasos)",
   "l": "Paso 1 · título",
   "v": "Elige el tratamiento"
  },
  {
   "k": "ini.s1s",
   "pag": "inicio",
   "g": "Cómo reservar (pasos)",
   "l": "Paso 1 · texto",
   "v": "O una evaluación si no sabes qué necesitas."
  },
  {
   "k": "ini.s2t",
   "pag": "inicio",
   "g": "Cómo reservar (pasos)",
   "l": "Paso 2 · título",
   "v": "Escoge día y hora"
  },
  {
   "k": "ini.s2s",
   "pag": "inicio",
   "g": "Cómo reservar (pasos)",
   "l": "Paso 2 · texto",
   "v": "Solo ves los horarios libres, sin llamar."
  },
  {
   "k": "ini.s3t",
   "pag": "inicio",
   "g": "Cómo reservar (pasos)",
   "l": "Paso 3 · título",
   "v": "Queda confirmada"
  },
  {
   "k": "ini.s3s",
   "pag": "inicio",
   "g": "Cómo reservar (pasos)",
   "l": "Paso 3 · texto",
   "v": "Al instante, y te avisamos por WhatsApp."
  },
  {
   "k": "ini.s4t",
   "pag": "inicio",
   "g": "Cómo reservar (pasos)",
   "l": "Paso 4 · título",
   "v": "Sigue todo en Mi Sonrisa"
  },
  {
   "k": "ini.s4s",
   "pag": "inicio",
   "g": "Cómo reservar (pasos)",
   "l": "Paso 4 · texto",
   "v": "Citas, plan, cuotas, recibos y recetas."
  },
  {
   "k": "faq.q1",
   "pag": "inicio",
   "g": "Preguntas frecuentes",
   "l": "Pregunta 1",
   "v": "¿Atienden con seguro o EPS?"
  },
  {
   "k": "faq.a1",
   "pag": "inicio",
   "g": "Preguntas frecuentes",
   "l": "Respuesta 1",
   "v": "Atendemos de forma particular y te damos boleta o factura para que solicites el reembolso a tu seguro."
  },
  {
   "k": "faq.q2",
   "pag": "inicio",
   "g": "Preguntas frecuentes",
   "l": "Pregunta 2",
   "v": "¿Puedo pagar mi tratamiento en cuotas?"
  },
  {
   "k": "faq.a2",
   "pag": "inicio",
   "g": "Preguntas frecuentes",
   "l": "Respuesta 2",
   "v": "Sí. Ortodoncia, implantes y rehabilitación se pagan con una cuota inicial y cuotas mensuales sin intereses."
  },
  {
   "k": "faq.q3",
   "pag": "inicio",
   "g": "Preguntas frecuentes",
   "l": "Pregunta 3",
   "v": "¿Qué es Mi Sonrisa?"
  },
  {
   "k": "faq.a3",
   "pag": "inicio",
   "g": "Preguntas frecuentes",
   "l": "Respuesta 3",
   "v": "Es tu portal: con tu código ves tus citas, tu plan de tratamiento, tu odontograma, tus pagos y descargas recibos y recetas."
  },
  {
   "k": "faq.q4",
   "pag": "inicio",
   "g": "Preguntas frecuentes",
   "l": "Pregunta 4",
   "v": "¿Atienden urgencias?"
  },
  {
   "k": "faq.a4",
   "pag": "inicio",
   "g": "Preguntas frecuentes",
   "l": "Respuesta 4",
   "v": "Sí. Si tienes dolor, un golpe o se rompió un diente, escríbenos por WhatsApp y te damos la primera cita del día."
  },
  {
   "k": "faq.q5",
   "pag": "inicio",
   "g": "Preguntas frecuentes",
   "l": "Pregunta 5",
   "v": "¿Atienden niños?"
  },
  {
   "k": "faq.a5",
   "pag": "inicio",
   "g": "Preguntas frecuentes",
   "l": "Respuesta 5",
   "v": "Sí, tenemos odontopediatra. Los niños pueden venir desde que sale su primer diente."
  },
  {
   "k": "sv.nota",
   "pag": "tratamientos",
   "g": "Nota de precios",
   "l": "Nota debajo de los tratamientos",
   "v": "Precios referenciales desde. El presupuesto exacto lo recibes por escrito después de tu evaluación, y puedes pagarlo en cuotas."
  },
  {
   "k": "sv.masP",
   "pag": "tratamientos",
   "g": "Sección «Y además»",
   "l": "Etiqueta",
   "v": "Y además"
  },
  {
   "k": "sv.masT",
   "pag": "tratamientos",
   "g": "Sección «Y además»",
   "l": "Título",
   "v": "Otros servicios"
  },
  {
   "k": "sv.masC",
   "pag": "tratamientos",
   "g": "Sección «Y además»",
   "l": "Continuación (en color)",
   "v": "del consultorio"
  },
  {
   "k": "ti.k1t",
   "pag": "tienda",
   "g": "Ventajas (debajo de los productos)",
   "l": "Ventaja 1 · título",
   "v": "Delivery en Lima"
  },
  {
   "k": "ti.k1s",
   "pag": "tienda",
   "g": "Ventajas (debajo de los productos)",
   "l": "Ventaja 1 · texto",
   "v": "Gratis desde S/ 120"
  },
  {
   "k": "ti.k2t",
   "pag": "tienda",
   "g": "Ventajas (debajo de los productos)",
   "l": "Ventaja 2 · título",
   "v": "Recomendados por dentistas"
  },
  {
   "k": "ti.k2s",
   "pag": "tienda",
   "g": "Ventajas (debajo de los productos)",
   "l": "Ventaja 2 · texto",
   "v": "Los usamos en consulta"
  },
  {
   "k": "ti.k3t",
   "pag": "tienda",
   "g": "Ventajas (debajo de los productos)",
   "l": "Ventaja 3 · título",
   "v": "Asesoría gratis"
  },
  {
   "k": "ti.k3s",
   "pag": "tienda",
   "g": "Ventajas (debajo de los productos)",
   "l": "Ventaja 3 · texto",
   "v": "Te ayudamos a elegir"
  },
  {
   "k": "ti.k4t",
   "pag": "tienda",
   "g": "Ventajas (debajo de los productos)",
   "l": "Ventaja 4 · título",
   "v": "Paga como quieras"
  },
  {
   "k": "ti.k4s",
   "pag": "tienda",
   "g": "Ventajas (debajo de los productos)",
   "l": "Ventaja 4 · texto",
   "v": "Yape, Plin, tarjeta o efectivo"
  },
  {
   "k": "ci.l1",
   "pag": "citas",
   "g": "Formulario",
   "l": "Paso 1",
   "v": "1. ¿Qué necesitas? *"
  },
  {
   "k": "ci.l2",
   "pag": "citas",
   "g": "Formulario",
   "l": "Paso 2",
   "v": "2. ¿Quién es el paciente? *"
  },
  {
   "k": "ci.pref",
   "pag": "citas",
   "g": "Formulario",
   "l": "Opción de dentista",
   "v": "Cualquier dentista disponible"
  },
  {
   "k": "ci.l3",
   "pag": "citas",
   "g": "Formulario",
   "l": "Paso 3",
   "v": "3. Elige el día y la hora *"
  },
  {
   "k": "ci.l4",
   "pag": "citas",
   "g": "Formulario",
   "l": "Paso 4",
   "v": "4. Tus datos de contacto *"
  },
  {
   "k": "ci.btn",
   "pag": "citas",
   "g": "Formulario",
   "l": "Botón de confirmar",
   "v": "Confirmar mi cita"
  },
  {
   "k": "ci.sumT",
   "pag": "citas",
   "g": "Resumen (columna derecha)",
   "l": "Título",
   "v": "Resumen de tu cita"
  },
  {
   "k": "ci.pnota",
   "pag": "citas",
   "g": "Resumen (columna derecha)",
   "l": "Nota del precio",
   "v": "El presupuesto final se confirma en la evaluación. Puedes pagarlo en cuotas."
  },
  {
   "k": "ci.note",
   "pag": "citas",
   "g": "Resumen (columna derecha)",
   "l": "Nota",
   "v": "Tu cita queda confirmada al instante. Te enviaremos un recordatorio por WhatsApp. Llega 10 minutos antes."
  },
  {
   "k": "ci.codeBtn",
   "pag": "citas",
   "g": "Resumen (columna derecha)",
   "l": "Botón inferior",
   "v": "¿Ya tienes código? Ver tus citas"
  },
  {
   "k": "mm.pill",
   "pag": "mi-sonrisa",
   "g": "Ingreso con código",
   "l": "Etiqueta",
   "v": "Portal de pacientes"
  },
  {
   "k": "mm.t1",
   "pag": "mi-sonrisa",
   "g": "Ingreso con código",
   "l": "Título",
   "v": "Mi"
  },
  {
   "k": "mm.t2",
   "pag": "mi-sonrisa",
   "g": "Ingreso con código",
   "l": "Título (en color)",
   "v": "Sonrisa"
  },
  {
   "k": "mm.txt",
   "pag": "mi-sonrisa",
   "g": "Ingreso con código",
   "l": "Texto",
   "v": "Ingresa tu código de paciente para ver tus citas, tu plan de tratamiento, tu odontograma, tus cuotas y descargar recibos y recetas."
  },
  {
   "k": "mm.btn",
   "pag": "mi-sonrisa",
   "g": "Ingreso con código",
   "l": "Botón",
   "v": "Entrar"
  },
  {
   "k": "mm.help",
   "pag": "mi-sonrisa",
   "g": "Ingreso con código",
   "l": "Ayuda",
   "v": "¿No tienes código? Te lo damos en tu primera cita o"
  },
  {
   "k": "mm.helpL",
   "pag": "mi-sonrisa",
   "g": "Ingreso con código",
   "l": "Enlace de ayuda",
   "v": "pídelo por WhatsApp"
  },
  {
   "k": "mm.c6",
   "pag": "mi-sonrisa",
   "g": "Panel del paciente (títulos)",
   "l": "Cuotas",
   "v": "Mis cuotas"
  },
  {
   "k": "mm.c1",
   "pag": "mi-sonrisa",
   "g": "Panel del paciente (títulos)",
   "l": "Próximas citas",
   "v": "Próximas citas"
  },
  {
   "k": "mm.c7",
   "pag": "mi-sonrisa",
   "g": "Panel del paciente (títulos)",
   "l": "Plan de tratamiento",
   "v": "Plan de tratamiento"
  },
  {
   "k": "mm.c8",
   "pag": "mi-sonrisa",
   "g": "Panel del paciente (títulos)",
   "l": "Odontograma",
   "v": "Mi odontograma"
  },
  {
   "k": "mm.c2",
   "pag": "mi-sonrisa",
   "g": "Panel del paciente (títulos)",
   "l": "Servicios y pagos",
   "v": "Servicios y pagos"
  },
  {
   "k": "mm.c4",
   "pag": "mi-sonrisa",
   "g": "Panel del paciente (títulos)",
   "l": "Recordatorios",
   "v": "Recordatorios"
  },
  {
   "k": "mm.c5",
   "pag": "mi-sonrisa",
   "g": "Panel del paciente (títulos)",
   "l": "Historial",
   "v": "Historial de atenciones"
  },
  {
   "k": "no.pill",
   "pag": "nosotros",
   "g": "Historia",
   "l": "Etiqueta",
   "v": "Nuestra historia"
  },
  {
   "k": "no.btn",
   "pag": "nosotros",
   "g": "Historia",
   "l": "Texto del botón",
   "v": "Reservar una cita"
  },
  {
   "k": "no.eqP",
   "pag": "nosotros",
   "g": "Equipo",
   "l": "Etiqueta",
   "v": "Especialistas"
  },
  {
   "k": "no.eqT",
   "pag": "nosotros",
   "g": "Equipo",
   "l": "Título",
   "v": "Conoce a"
  },
  {
   "k": "no.eqC",
   "pag": "nosotros",
   "g": "Equipo",
   "l": "Título (en color)",
   "v": "nuestros dentistas"
  },
  {
   "k": "no.gaP",
   "pag": "nosotros",
   "g": "Consultorio",
   "l": "Etiqueta",
   "v": "Consultorio"
  },
  {
   "k": "no.gaT",
   "pag": "nosotros",
   "g": "Consultorio",
   "l": "Título",
   "v": "Un espacio"
  },
  {
   "k": "no.gaC",
   "pag": "nosotros",
   "g": "Consultorio",
   "l": "Título (en color)",
   "v": "cómodo y seguro"
  },
  {
   "k": "no.ga1",
   "pag": "nosotros",
   "g": "Consultorio",
   "l": "Texto foto 1",
   "v": "Equipos modernos"
  },
  {
   "k": "no.ga2",
   "pag": "nosotros",
   "g": "Consultorio",
   "l": "Texto foto 2",
   "v": "Radiografía digital"
  },
  {
   "k": "no.ga3",
   "pag": "nosotros",
   "g": "Consultorio",
   "l": "Texto foto 3",
   "v": "Sala de espera cómoda"
  },
  {
   "k": "co.dir",
   "pag": "contacto",
   "g": "Títulos de los datos",
   "l": "Dirección",
   "v": "Dirección"
  },
  {
   "k": "co.tel",
   "pag": "contacto",
   "g": "Títulos de los datos",
   "l": "Teléfono",
   "v": "WhatsApp y teléfono"
  },
  {
   "k": "co.mail",
   "pag": "contacto",
   "g": "Títulos de los datos",
   "l": "Correo",
   "v": "Correo"
  },
  {
   "k": "co.hor",
   "pag": "contacto",
   "g": "Títulos de los datos",
   "l": "Horarios",
   "v": "Horarios"
  },
  {
   "k": "co.ls",
   "pag": "contacto",
   "g": "Títulos de los datos",
   "l": "Días de semana",
   "v": "Lunes a sábado"
  },
  {
   "k": "co.dom",
   "pag": "contacto",
   "g": "Títulos de los datos",
   "l": "Domingo",
   "v": "Domingos"
  },
  {
   "k": "co.em",
   "pag": "contacto",
   "g": "Títulos de los datos",
   "l": "Urgencias",
   "v": "Urgencias"
  },
  {
   "k": "co.em24",
   "pag": "contacto",
   "g": "Títulos de los datos",
   "l": "Horario de urgencias",
   "v": "Escríbenos por WhatsApp"
  },
  {
   "k": "co.fT",
   "pag": "contacto",
   "g": "Formulario",
   "l": "Título",
   "v": "Escríbenos"
  },
  {
   "k": "co.fP",
   "pag": "contacto",
   "g": "Formulario",
   "l": "Texto",
   "v": "Te respondemos por WhatsApp en minutos."
  },
  {
   "k": "co.btn",
   "pag": "contacto",
   "g": "Formulario",
   "l": "Botón",
   "v": "Enviar por WhatsApp"
  },
  {
   "k": "pr.1t",
   "pag": "privacidad",
   "g": "Aviso de privacidad",
   "l": "Responsable · título",
   "v": "¿Quién es responsable de tus datos?"
  },
  {
   "k": "pr.1",
   "pag": "privacidad",
   "g": "Aviso de privacidad",
   "l": "Responsable · texto",
   "v": "Dental Cabanillas, con dirección indicada en esta web, es responsable del tratamiento de los datos personales que nos brindas."
  },
  {
   "k": "pr.2t",
   "pag": "privacidad",
   "g": "Aviso de privacidad",
   "l": "Datos que recopilamos · título",
   "v": "¿Qué datos usamos?"
  },
  {
   "k": "pr.2",
   "pag": "privacidad",
   "g": "Aviso de privacidad",
   "l": "Datos que recopilamos · texto",
   "v": "Nombre, celular, correo, documento de identidad y la información de salud bucal necesaria para atenderte (historia clínica, odontograma, radiografías y tratamientos)."
  },
  {
   "k": "pr.3t",
   "pag": "privacidad",
   "g": "Aviso de privacidad",
   "l": "Para qué los usamos · título",
   "v": "¿Para qué los usamos?"
  },
  {
   "k": "pr.3",
   "pag": "privacidad",
   "g": "Aviso de privacidad",
   "l": "Para qué los usamos · texto",
   "v": "Para agendar tus citas, brindarte atención odontológica, enviarte recordatorios por WhatsApp, emitir recibos y mostrarte tu información en Mi Sonrisa."
  },
  {
   "k": "pr.4t",
   "pag": "privacidad",
   "g": "Aviso de privacidad",
   "l": "Seguridad · título",
   "v": "¿Cómo los protegemos?"
  },
  {
   "k": "pr.4",
   "pag": "privacidad",
   "g": "Aviso de privacidad",
   "l": "Seguridad · texto",
   "v": "Tus datos de salud solo los ve el personal del consultorio. En Mi Sonrisa solo puede ver tu información quien tiene tu código personal: no lo compartas."
  },
  {
   "k": "pr.5t",
   "pag": "privacidad",
   "g": "Aviso de privacidad",
   "l": "Tus derechos · título",
   "v": "Tus derechos"
  },
  {
   "k": "pr.5",
   "pag": "privacidad",
   "g": "Aviso de privacidad",
   "l": "Tus derechos · texto",
   "v": "Conforme a la Ley N.° 29733, Ley de Protección de Datos Personales, puedes pedir acceso, rectificación, cancelación u oposición al uso de tus datos escribiéndonos por WhatsApp o al correo del consultorio."
  }
 ],
 "imagenesFijas": [
  {
   "k": "cta",
   "pag": "inicio",
   "g": "Llamado final",
   "l": "Imagen del llamado final",
   "src": "https://images.unsplash.com/photo-1674775372064-8c75d3f8c757?auto=format&fit=crop&w=700&q=80"
  },
  {
   "k": "ba.despues",
   "pag": "inicio",
   "g": "Antes y después",
   "l": "Foto DESPUÉS",
   "src": "https://images.unsplash.com/photo-1489278353717-f64c6ee8a4d2?auto=format&fit=crop&w=900&q=80"
  },
  {
   "k": "ba.antes",
   "pag": "inicio",
   "g": "Antes y después",
   "l": "Foto ANTES",
   "src": "https://images.unsplash.com/photo-1489278353717-f64c6ee8a4d2?auto=format&fit=crop&w=900&q=80"
  },
  {
   "k": "mm.img",
   "pag": "mi-sonrisa",
   "g": "Ingreso con código",
   "l": "Imagen del ingreso",
   "src": "https://images.unsplash.com/photo-1785860817740-c95735ba03b1?auto=format&fit=crop&w=900&q=80"
  },
  {
   "k": "ga.1",
   "pag": "nosotros",
   "g": "Consultorio",
   "l": "Foto 1",
   "src": "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=700&q=80"
  },
  {
   "k": "ga.2",
   "pag": "nosotros",
   "g": "Consultorio",
   "l": "Foto 2",
   "src": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=700&q=80"
  },
  {
   "k": "ga.3",
   "pag": "nosotros",
   "g": "Consultorio",
   "l": "Foto 3",
   "src": "https://images.unsplash.com/photo-1762625570087-6d98fca29531?auto=format&fit=crop&w=700&q=80"
  }
 ],
 "iconos": {
  "tooth": "<path d=\"M7 3c-2.5 0-4 2-4 4.5 0 2 1 3.5 1.5 5.5.6 2.5.8 5.5 2 7.5.8 1.3 2.2 1 2.6-.4l.9-3.6c.3-1.2 1.7-1.2 2 0l.9 3.6c.4 1.4 1.8 1.7 2.6.4 1.2-2 1.4-5 2-7.5.5-2 1.5-3.5 1.5-5.5C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3z\"/>",
  "search": "<circle cx=\"11\" cy=\"11\" r=\"7\"/><path d=\"M21 21l-4.3-4.3\"/>",
  "clean": "<path d=\"M7 3c-2.5 0-4 2-4 4.5 0 2 1 3.5 1.5 5.5.6 2.5.8 5.5 2 7.5.8 1.3 2.2 1 2.6-.4l.9-3.6c.3-1.2 1.7-1.2 2 0l.9 3.6c.4 1.4 1.8 1.7 2.6.4 1.2-2 1.4-5 2-7.5.5-2 1.5-3.5 1.5-5.5C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3z\"/><path d=\"M19 1v3M17.5 2.5h3\"/>",
  "fill": "<path d=\"M7 3c-2.5 0-4 2-4 4.5 0 2 1 3.5 1.5 5.5.6 2.5.8 5.5 2 7.5.8 1.3 2.2 1 2.6-.4l.9-3.6c.3-1.2 1.7-1.2 2 0l.9 3.6c.4 1.4 1.8 1.7 2.6.4 1.2-2 1.4-5 2-7.5.5-2 1.5-3.5 1.5-5.5C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3z\"/><circle cx=\"12\" cy=\"8.5\" r=\"2\"/>",
  "sparkle": "<path d=\"M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z\"/>",
  "veneer": "<path d=\"M5 4h14v6c0 6-3 10-7 10S5 16 5 10z\"/><path d=\"M9 4v7M15 4v7\"/>",
  "brace": "<rect x=\"2\" y=\"8\" width=\"20\" height=\"8\" rx=\"4\"/><path d=\"M2 12h20M7 9.5v5M12 9.5v5M17 9.5v5\"/>",
  "aligner": "<path d=\"M3 9c2-3 16-3 18 0v3c-2 5-16 5-18 0z\"/><path d=\"M7 9v4M12 8.5v5M17 9v4\"/>",
  "root": "<path d=\"M7 3c-2.5 0-4 2-4 4.5 0 2 1 3.5 1.5 5.5.6 2.5.8 5.5 2 7.5.8 1.3 2.2 1 2.6-.4l.9-3.6c.3-1.2 1.7-1.2 2 0l.9 3.6c.4 1.4 1.8 1.7 2.6.4 1.2-2 1.4-5 2-7.5.5-2 1.5-3.5 1.5-5.5C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3z\"/><path d=\"M10 9l-1 7M14 9l1 7\"/>",
  "pliers": "<path d=\"M8 3l4 8 4-8M12 11v10M8 21h8\"/>",
  "implant": "<path d=\"M7 2h10c0 3-2 5-5 5S7 5 7 2z\"/><path d=\"M9 9h6M9.5 12h5M10 15h4M10.5 18h3M12 7v14\"/>",
  "crown": "<path d=\"M3 8l4 4 5-7 5 7 4-4-2 11H5z\"/>",
  "kid": "<circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M8.5 14.5a4 4 0 0 0 7 0M9 9.5h.01M15 9.5h.01\"/>",
  "xray": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M8 8c1 1 1 3 0 4s-1 3 0 4M16 8c-1 1-1 3 0 4s1 3 0 4M12 7v10\"/>",
  "shield": "<path d=\"M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z\"/><path d=\"M9 12l2 2 4-4\"/>",
  "moon": "<path d=\"M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z\"/>",
  "siren": "<path d=\"M6 18v-6a6 6 0 0 1 12 0v6M4 18h16v3H4zM12 2v2M4.2 5.2l1.4 1.4M19.8 5.2l-1.4 1.4\"/>",
  "brush": "<path d=\"M4 20L15 9M15 9l2-2c1-1 3-1 4 0M13 5l6 6M11 7l6 6M9 9l6 6\"/>",
  "paste": "<path d=\"M9 2h6v3H9zM8 5h8l1 4v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V9z\"/><path d=\"M10 12h4\"/>",
  "floss": "<circle cx=\"12\" cy=\"12\" r=\"8\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M20 12h2\"/>",
  "drop": "<path d=\"M12 2s7 7.5 7 12.5A7 7 0 0 1 5 14.5C5 9.5 12 2 12 2z\"/>",
  "gift": "<rect x=\"3\" y=\"8\" width=\"18\" height=\"13\" rx=\"2\"/><path d=\"M12 8v13M3 12h18M12 8c-2-4-6-4-6-1s6 1 6 1zM12 8c2-4 6-4 6-1s-6 1-6 1z\"/>",
  "cal": "<rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M16 2v4M8 2v4M3 10h18\"/>",
  "bag": "<path d=\"M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0\"/>",
  "key": "<circle cx=\"7.5\" cy=\"15.5\" r=\"5.5\"/><path d=\"M21 2l-9.6 9.6M15.5 7.5l3 3L22 7l-3-3\"/>",
  "phone": "<path d=\"M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z\"/>",
  "pin": "<path d=\"M12 22s8-7.6 8-13a8 8 0 0 0-16 0c0 5.4 8 13 8 13z\"/><circle cx=\"12\" cy=\"9\" r=\"3\"/>",
  "clock": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 6v6l4 2\"/>",
  "mail": "<rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\"/><path d=\"M22 6l-10 7L2 6\"/>",
  "menu": "<path d=\"M4 7h16M4 12h16M4 17h16\"/>",
  "x": "<path d=\"M18 6L6 18M6 6l12 12\"/>",
  "arrow": "<path d=\"M5 12h14M13 6l6 6-6 6\"/>",
  "bell": "<path d=\"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9\"/><path d=\"M10.3 21a1.9 1.9 0 0 0 3.4 0\"/>",
  "file": "<path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"/><path d=\"M14 2v6h6\"/>",
  "heart": "<path d=\"M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z\"/>",
  "truck": "<path d=\"M1 3h15v13H1zM16 8h4l3 3v5h-7z\"/><circle cx=\"5.5\" cy=\"18.5\" r=\"2.5\"/><circle cx=\"18.5\" cy=\"18.5\" r=\"2.5\"/>",
  "star": "<path d=\"M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z\"/>",
  "users": "<circle cx=\"9\" cy=\"8\" r=\"4\"/><path d=\"M1 21a8 8 0 0 1 16 0M17 4a4 4 0 0 1 0 8M23 21a8 8 0 0 0-5-7.4\"/>",
  "award": "<circle cx=\"12\" cy=\"8\" r=\"6\"/><path d=\"M8.2 13.4L7 22l5-3 5 3-1.2-8.6\"/>",
  "card": "<rect x=\"2\" y=\"5\" width=\"20\" height=\"14\" rx=\"2\"/><path d=\"M2 10h20\"/>",
  "print": "<path d=\"M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2\"/><rect x=\"6\" y=\"14\" width=\"12\" height=\"8\"/>",
  "out": "<path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9\"/>",
  "history": "<path d=\"M3 12a9 9 0 1 0 3-6.7L3 8\"/><path d=\"M3 3v5h5M12 7v5l4 2\"/>",
  "check": "<path d=\"M5 12l5 5L20 7\"/>",
  "pill": "<path d=\"M10.5 20.5a5 5 0 0 1-7-7l10-10a5 5 0 0 1 7 7z\"/><path d=\"M8.5 8.5l7 7\"/>",
  "steth": "<path d=\"M6 3v6a6 6 0 0 0 12 0V3M12 15v2a4 4 0 0 0 8 0v-3\"/><circle cx=\"20\" cy=\"12\" r=\"2\"/>",
  "chair": "<path d=\"M5 3v9h10l4 6M5 12l-1 9M15 12v9M5 7h6\"/>",
  "lock": "<rect x=\"4\" y=\"11\" width=\"16\" height=\"10\" rx=\"2\"/><path d=\"M8 11V7a4 4 0 0 1 8 0v4\"/>",
  "smile": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M7 13a5 5 0 0 0 10 0zM9 9h.01M15 9h.01\"/>",
  "paw": "<path d=\"M7 3c-2.5 0-4 2-4 4.5 0 2 1 3.5 1.5 5.5.6 2.5.8 5.5 2 7.5.8 1.3 2.2 1 2.6-.4l.9-3.6c.3-1.2 1.7-1.2 2 0l.9 3.6c.4 1.4 1.8 1.7 2.6.4 1.2-2 1.4-5 2-7.5.5-2 1.5-3.5 1.5-5.5C21 5 19.5 3 17 3c-2 0-3 1-5 1S9 3 7 3z\"/>",
  "home": "<path d=\"M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z\"/>"
 }
};
