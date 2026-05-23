const products = Object.freeze([
    {
        id: "product-01",

        title:
            "Anime Glass UI",

        description:
            "Minimal iOS inspired anime interface system with smooth motion effects and adaptive responsive layout.",

        image:
            "./assets/images/cards/card-01.webp",

        frame:
            "./assets/images/branding/anime-frame.webp",

        tags: [
            "Anime",
            "iOS",
            "UI"
        ],

        actions: {
            primary: {
                label: "Xem chi tiết",

                type: "modal"
            },

            secondary: {
                label: "Demo",

                href: "#"
            }
        },

        panel: {
            enabled: true,

            items: [
                {
                    label: "Download",

                    href: "#"
                },

                {
                    label: "GitHub",

                    href: "#"
                },

                {
                    label: "Thông tin",

                    href: "#"
                }
            ]
        },

        modal: {
            title:
                "Anime Glass UI",

            description:
                "Adaptive anime inspired interface engine with ultra smooth motion architecture and responsive iOS aesthetic.",

            image:
                "./assets/images/cards/card-01.webp"
        }
    },

    {
        id: "product-02",

        title:
            "Motion Card Engine",

        description:
            "GPU accelerated interactive card system supporting adaptive content sizing and customizable anime branding layers.",

        image:
            "./assets/images/cards/card-02.webp",

        frame:
            "./assets/images/branding/anime-frame.webp",

        tags: [
            "Motion",
            "Cards",
            "Interactive"
        ],

        actions: {
            primary: {
                label: "Xem chi tiết",

                type: "modal"
            },

            secondary: {
                label: "Preview",

                href: "#"
            }
        },

        panel: {
            enabled: true,

            items: [
                {
                    label: "Download",

                    href: "#"
                },

                {
                    label: "Resources",

                    href: "#"
                }
            ]
        },

        modal: {
            title:
                "Motion Card Engine",

            description:
                "Dynamic card engine with layered motion feedback, adaptive layout scaling, hover depth and anime visual framing.",

            image:
                "./assets/images/cards/card-02.webp"
        }
    }
]);

export default products; 
