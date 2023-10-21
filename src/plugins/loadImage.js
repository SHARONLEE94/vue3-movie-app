export default{
    install(app){
        app.config.globalProperties.$loadImage = src=>{
            // 비동기 형태
            return new Promise(resolve=>{
                const img = document.createElement('img')
                img.src = src
                img.addEventListener('load',()=>{
                    resolve() // 이미지의 load가 끝난 후 다음 상태를 보장한다는 약속
                })
            })
        }
    }
}