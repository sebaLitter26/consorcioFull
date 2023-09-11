export type InputType = "button" | "checkbox" | "color" | "date" | "datetime-local" | "email" | "file" | "hidden" | "image" |
                        "month" | "number" | "password" | "radio" | "range" | "reset" | "search" | "submit" | "tel" | "text" |
                        "time" | "url" | "week";

export interface CoolInputOption {
    displayValue?: string;
    value?: any;
}

export interface NgxMaskPattern {
    pattern: RegExp;
}
