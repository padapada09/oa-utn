# Proyecto formato _.book_

## Abstract

En este repositorio se encuentra el desarrollo de un nuevo formato de libros academicos interactivos. El mismo está siendo desarrollado en el contexto de un beca de investigación en la Universidad Tecnológica Nacional, Facultad Regional Santa Fe.<br/>
Beca: _I-S-CIDISI-7757-Aplicaciones de técnicas de inteligencia artificial en plataformas de e-learning para dar soporte a estrategias pedagógicas_

## Objetivo

Encontrar nuevas herramientas para mejorar el aprendizaje de los estudiantes, implementando el concepto de "_Objetos de aprendizaje_" (De ahora en más OA). Dejando un camino definido y sencillo para que las mismas puedan ser implementadas por otros profesores.

## El formato propuesto

El formato propuesto se basa en la construcción de documentos interactivos
que tienen como atomo el "bloque".
Este bloque tendrá un nombre y una serie de componentes que lo integren. Esta lista de componentes puede ser un texto, imagen, ... u otro bloque.
Seccionar la interacción en bloques permite crear una estructura sencilla de navegar y consultar. Más adelante extenderemos los beneficios de manejar el concepto de bloque.

## Interprete

En conjunto con el formato, se está desarrollando un interprete web. El mismo está diseñado para ser usado tanto en celulares como en computadoras.

## Como correr el prototipo

El proyecto esta desarrollado usando react. Para correrlo se debe contar con node y npm.
Si ya se tienen dichas herramientas solo hay que posicionarse en la ruta del proyecto y correr los comandos

        npm install
        npm start

Estos comandos levantarán un servidor de desarrollo en el puerto 3000.