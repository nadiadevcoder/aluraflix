const extractYouTubeID = (url) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
};

const cardsData = [
  {
    id: 1,
    titulo: 'video banner',
    categoria: 'banner',
    enlace: extractYouTubeID('https://www.youtube.com/embed/ov7vA5HFe6w'),
    descripcion: 'Este es un video educativo sobre React para el banner',
  },

  {
    id: 2,
    titulo: 'Mi Video Favorito',
    categoria: 'front end',
    enlace: extractYouTubeID('https://www.youtube.com/watch?v=PztCEdIJITY'),
    descripcion: 'Este es un video educativo sobre React.',
  },


  {
    id: 3,
    titulo: 'que es jv',
    categoria: 'front end',
    enlace: extractYouTubeID('https://www.youtube.com/watch?v=GJfOSoaXk4s'),
    descripcion: 'Este es un video educativo sobre React.',
  },

  {
    id: 4,
    titulo: 'Como utilizar el Display block, inline, inline-block',
    categoria: 'front end',
    enlace: extractYouTubeID('https://www.youtube.com/watch?v=AG2QssLpQzI&t=42s'),
    descripcion: 'Este es un video educativo sobre React.',
  },

  {
    id: 5,
    titulo: 'Otro Video',
    categoria: 'back end',
    imagenPortada: '', 
    enlace: extractYouTubeID('https://www.youtube.com/watch?v=t-iqt1b2qqk'), 
    descripcion: 'Este es un video entretenido.',
  },

  {
    id: 6,
    titulo: 'Otro Video',
    categoria: 'back end',
    imagenPortada: '', 
    enlace: extractYouTubeID('https://www.youtube.com/watch?v=cLLKVd5CNLc'),
    descripcion: 'Este es un video entretenido.',
  },

  {
    id: 7,
    titulo: 'Otro Video',
    categoria: 'back end',
    imagenPortada: '', 
    enlace: extractYouTubeID('https://www.youtube.com/watch?v=GrEO8nZzyZM'),
    descripcion: 'Este es un video entretenido.',
  },
 
  {
    id: 8,
    titulo: 'Otro',
    categoria: 'Innovación y Gestión',
    imagenPortada: '', 
    enlace: extractYouTubeID('https://www.youtube.com/watch?v=o7VANBy9cl0'),
    descripcion: 'innygestion',
  },
  
  {
    id: 9,
    titulo: 'Otro',
    categoria: 'Innovación y Gestión',
    imagenPortada: '', 
    enlace: extractYouTubeID('https://www.youtube.com/watch?v=N9vxfMJEyYg'),
    descripcion: 'innygestion',
  },
  
  {
    id: 10,
    titulo: 'Otro',
    categoria: 'Innovación y Gestión',
    imagenPortada: '', 
    enlace: extractYouTubeID('https://www.youtube.com/watch?v=xdzz3_WqFmE'),
    descripcion: 'innygestion',
  },
];

export default cardsData;
