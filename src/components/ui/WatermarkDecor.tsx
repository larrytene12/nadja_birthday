"use client";

import Image from "next/image";

export default function WatermarkDecor() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
            {/* Top Left Corner */}
            <div className="absolute -top-16 -left-16 opacity-30 transform -rotate-12" style={{ width: '250px', height: '250px' }}>
                <Image
                    src="/flowers/flower-1-clean.png"
                    alt="decor"
                    fill
                    sizes="250px"
                    style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}

                />
            </div>

            {/* Bottom Right Corner */}
            <div className="absolute -bottom-16 -right-16 opacity-20 transform rotate-45" style={{ width: '280px', height: '280px' }}>
                <Image
                    src="/flowers/flower-2-clean.png"
                    alt="decor"
                    fill
                    sizes="280px"
                    style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}

                />
            </div>

            {/* Top Right Corner (smaller) */}
            <div className="absolute top-32 -right-10 opacity-15 transform rotate-180" style={{ width: '150px', height: '150px' }}>
                <Image
                    src="/flowers/flower-2-clean.png"
                    alt="decor"
                    fill
                    sizes="150px"
                    style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}

                />
            </div>
        </div>
    );
}
