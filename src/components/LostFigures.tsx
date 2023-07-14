import React, {FC} from 'react';
import {Figure} from "../models/figures/Figure";

interface LostFiguresProps {
    title: string,
    figures: Figure[];
}

const LostFigures: FC<LostFiguresProps> = ({title, figures}) => {
    return (
        <div className="lost">
            <h3 className="title">{title}</h3>
            {figures.map(figure =>
                <div className="list" key={figure.id}>
                    {figure.logo && <img width={30} height={30} src={figure.logo} alt="figure"/>} {figure.name}
                </div>
            )}
        </div>
    );
};

export default LostFigures;