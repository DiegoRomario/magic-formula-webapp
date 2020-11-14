import { DynamicPipeDataType } from './dynamic-pipe-data-type.enum';

export class ColumnsDefinition {
    constructor({ key, label, pipe = DynamicPipeDataType.default, size = 100, textAlign = 'right', arrowPosition = 'before' }
        : { key: string, label: string, pipe?: DynamicPipeDataType, size?: number, textAlign?: string, arrowPosition?: string }) {
        this.label = label;
        this.key = key;
        this.pipe = pipe;
        this.size = size;
        this.textAlign = textAlign;
        this.arrowPosition = arrowPosition;
    }
    label: string;
    key: string;
    size: number;
    pipe: DynamicPipeDataType;
    textAlign: string;
    arrowPosition: string;

}
