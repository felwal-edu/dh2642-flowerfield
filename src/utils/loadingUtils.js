//TODO for-loop solution?
import loadingFlower1 from "@/assets/loading_icons/loading_icon_1.svg"
import loadingFlower2 from "@/assets/loading_icons/loading_icon_2.svg"
import loadingFlower3 from "@/assets/loading_icons/loading_icon_3.svg"
import loadingFlower4 from "@/assets/loading_icons/loading_icon_4.svg"
import loadingFlower5 from "@/assets/loading_icons/loading_icon_5.svg"
import loadingFlower6 from "@/assets/loading_icons/loading_icon_6.svg"
import loadingFower7 from "@/assets/loading_icons/loading_icon_7.svg"
import loadingFlower8 from "@/assets/loading_icons/loading_icon_8.svg"
import loadingFlower9 from "@/assets/loading_icons/loading_icon_9.svg"

const LOADING_IMAGES = [loadingFlower1, loadingFlower2, loadingFlower3,
                        loadingFlower4, loadingFlower5, loadingFlower6,
                        loadingFower7, loadingFlower8, loadingFlower9]

function getRandomLoadingImage() {
    let item = LOADING_IMAGES[Math.floor(Math.random() * LOADING_IMAGES.length)]
    return item;
}

function isPromiseLoading(promiseState) {
    return promiseState.promise && !promiseState.error && !promiseState.data;
}

export { getRandomLoadingImage, isPromiseLoading };
