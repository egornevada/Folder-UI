// packages/ui/src/components/Field.tsx
import * as React from "react";
import cx from "clsx";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type FieldProps = {
  label: string;
  description?: string | false;
  error?: boolean | string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /** Кнопка очистки (крестик) справа. По умолчанию включена. */
  clearable?: boolean;
  disabled?: boolean;
  className?: string;
  /** Можно прокинуть HSLA/var-токены для оверлеев и/или базовых цветов */
  style?: React.CSSProperties & {
    ["--layer-hover"]?: string;
    ["--layer-pressed"]?: string;
    ["--field-bg"]?: string;
    ["--field-border"]?: string;
    ["--field-fg"]?: string;
  };
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "children">;

const Field = React.forwardRef<HTMLInputElement, FieldProps>((props, ref) => {
  const {
    label,
    description,
    error,
    leftIcon,
    rightIcon,
    clearable = true,
    disabled,
    className,
    style,
    id: idProp,
    value,
    defaultValue,
    onFocus,
    onBlur,
    ...inputProps
  } = props;

  const reactId = React.useId();
  const inputId = idProp ?? `fld-${reactId}`;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const setRefs = (node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
  };

  const [focused, setFocused] = React.useState(false);
  const [internal, setInternal] = React.useState<
    string | number | readonly string[] | undefined
  >(defaultValue);

  const hasText =
    value != null
      ? String(value).length > 0
      : internal != null && String(internal).length > 0;

  // Один пресет размеров (высота 48)
  const s = {
    h: "h-[48px]",
    text: "text-[16px] leading-[20px]",
    labelSm: "text-[12px] leading-[12px]",
    radius: "rounded-[12px]",
    padX: "px-[16px]",
    icon: "text-[24px]",
  };

  const borderCls = cx(
    "border",
    error
      ? "border-stroke-error"
      : (focused || hasText)
        ? "[border-color:var(--fg-1)]"
        : "border-stroke-controls"
  );
  const bgCls = "bg-bg-1";
  const textCls = "text-fg-1";
  const disabledCls = disabled ? "opacity-50 cursor-not-allowed" : "cursor-text";

  return (
    <div className={cx("w-full", className)} style={style as React.CSSProperties}>
      <label
        htmlFor={inputId}
        className={cx(
          "group relative block w-full overflow-hidden",
          s.radius,
          bgCls,
          borderCls,
          textCls,
          disabledCls
        )}
        aria-disabled={disabled || undefined}
      >
        {/* StateLayer — под контентом, красит только фон */}
        <span
          aria-hidden
          className={cx(
            "pointer-events-none absolute inset-0 z-0 transition-colors duration-150",
            "bg-transparent",
            "group-hover:[background:var(--state-default-hover)]",
            "group-active:[background:var(--layer-pressed)]"
          )}
        />

        {/* Левый значок (опционально) */}
        {leftIcon && (
          <span
            className={cx(
              "absolute top-1/2 -translate-y-1/2 left-[16px]",
              s.icon,
              "text-fg-2"
            )}
          >
            {leftIcon}
          </span>
        )}

        {/* Правый значок (если прокинут) */}
        {rightIcon && (
          <span
            className={cx(
              "absolute top-1/2 -translate-y-1/2 right-[16px]",
              s.icon,
              "text-fg-2"
            )}
          >
            {rightIcon}
          </span>
        )}

        {/* Кнопка очистки: резервируем место всегда, сам элемент скрываем без кликабельности, чтобы не было скачка */}
        {clearable && !disabled && !rightIcon && (
          <button
            type="button"
            aria-label="Очистить"
            tabIndex={hasText ? 0 : -1}
            aria-hidden={hasText ? undefined : true}
            onClick={() => {
              setInternal("");
              if (inputRef.current) {
                inputRef.current.value = "";
                inputRef.current.focus();
              }
              (inputProps as any).onChange?.({ target: { value: "" } } as any);
            }}
            className={cx(
              "absolute top-1/2 -translate-y-1/2 right-[16px]",
              "z-20 flex items-center justify-center transition-opacity",
              s.icon,
              "text-fg-2 hover:text-fg-1",
              hasText ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
          >
            <CloseRoundedIcon fontSize="inherit" />
          </button>
        )}

        {/* Плавающий лейбл (Label Position · In) */}
        <span
          className={cx(
            "absolute z-10 pointer-events-none transition-all",
            leftIcon ? "left-[44px]" : "left-[16px]",
            !focused && !hasText
              ? cx("top-1/2 -translate-y-1/2", s.text, "text-fg-3")
              : cx("top-[8px] translate-y-0", s.labelSm, "text-fg-3")
          )}
        >
          {label}
          {inputProps.required && <span className="text-fg-error">&nbsp;*</span>}
        </span>

        {/* Сам input */}
        <input
          {...inputProps}
          id={inputId}
          ref={setRefs}
          disabled={disabled}
          className={cx(
            "relative z-10 block w-full bg-transparent outline-none",
            s.h,
            s.text,
            s.radius,
            s.padX,
            (focused || hasText) ? "pt-[20px] pb-[8px]" : "pt-0 pb-0",
            leftIcon ? "pl-[44px]" : "pl-[16px]",
            (rightIcon || clearable) ? "pr-[44px]" : "pr-[16px]",
            "placeholder-transparent"
          )}
          value={value as any}
          defaultValue={defaultValue as any}
          onChange={(e) => {
            setInternal(e.target.value);
            inputProps.onChange?.(e);
          }}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
        />
      </label>

      {/* Подписи под полем (ошибка/описание) */}
      {(typeof error === "string" || description) && (
        <div
          className={cx(
            "mt-1 text-[12px] leading-[16px]",
            typeof error === "string" ? "text-fg-error" : "text-fg-3"
          )}
        >
          {typeof error === "string" ? error : description}
        </div>
      )}
    </div>
  );
});

Field.displayName = "Field";
export default Field;