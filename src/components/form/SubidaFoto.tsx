import { useRef } from "react";
import styles from "../../styles/RegistroCampers.module.css";

interface Props {
    foto_actual: string;
    manejar_cambio_foto: (foto: string) => void;
}

export default function SubidaFoto({ foto_actual, manejar_cambio_foto }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const abrirSelector = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) {
        const lector = new FileReader();
        lector.readAsDataURL(file);
        
        lector.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;

            img.onload = () => {
                const canvas = document.createElement("canvas");
                const MAX_WIDTH = 400;
                const MAX_HEIGHT = 400;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.fillStyle = "#ffffff";
                    ctx.fillRect(0, 0, width, height);
                }
                ctx?.drawImage(img, 0, 0, width, height);

                const base64Optimizado = canvas.toDataURL("image/jpeg", 0.7);
                
                manejar_cambio_foto(base64Optimizado);
            };
        };
    }
};

    return (
        <div className={styles.contenedor_foto}>
            <div 
                className={styles.avatar_preview}
                onClick={abrirSelector}
            >
                {foto_actual ? (
                    <img 
                        src={foto_actual} 
                        alt="Vista previa" 
                        onError={() => {
                            console.error("Error cargando imagen.");
                            manejar_cambio_foto("");
                        }}
                    />
                ) : (
                    <span className={styles.placeholder_texto}>Sin Foto</span>
                )}
            </div>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />

            <span 
                className={styles.editar_foto}
                onClick={abrirSelector}
            >
                {foto_actual ? "Cambiar Foto" : "Subir Foto"}
            </span>
        </div>
    );
}