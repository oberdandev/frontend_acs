import React, { useState } from "react";

let nome = 0;

export const inserirDataAtividade = (value) => {
    nome = value;
};

export const checkForm = () => {
    console.log(nome)
};