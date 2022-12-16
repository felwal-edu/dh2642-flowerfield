//TODO for-loop solution?
import loading_flower1 from "@/assets/loading_icons/loading_icon_1.png"
import loading_flower2 from "@/assets/loading_icons/loading_icon_2.png"
import loading_flower3 from "@/assets/loading_icons/loading_icon_3.png"
import loading_flower4 from "@/assets/loading_icons/loading_icon_4.png"
import loading_flower5 from "@/assets/loading_icons/loading_icon_5.png"
import loading_flower6 from "@/assets/loading_icons/loading_icon_6.png"
import loading_flower7 from "@/assets/loading_icons/loading_icon_7.png"
import loading_flower8 from "@/assets/loading_icons/loading_icon_8.png"
import loading_flower9 from "@/assets/loading_icons/loading_icon_9.png"

const LOADING_IMAGES = [loading_flower1, loading_flower2, loading_flower3,
                        loading_flower4, loading_flower5, loading_flower6,
                        loading_flower7, loading_flower8, loading_flower9]

function getRandomLoadingImage() {
    let item = LOADING_IMAGES[Math.floor(Math.random() * LOADING_IMAGES.length)]
    return item;
}

export { getRandomLoadingImage };
