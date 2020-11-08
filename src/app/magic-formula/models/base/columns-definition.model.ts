import { DynamicPipeDataType } from './dynamic-pipe-data-type.enum';

export class ColumnsDefinition {
    constructor({ key, label, pipe = DynamicPipeDataType.default, size = 100 }
        : { key: string, label: string, pipe?: DynamicPipeDataType, size?: number }) {
        this.label = label;
        this.key = key;
        this.pipe = pipe;
        this.size = size;
    }
    label: string;
    key: string;
    size: number;
    pipe: DynamicPipeDataType;
}
