import React from "react";

import styles from "src/styles/logo.module.css";

function LogoHorizontal({
  className = "",
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <svg
      width="188"
      height="43"
      viewBox="0 0 188 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} ${styles.logo}`}
    >
      <path
        d="M2.53906 8.5625H13.1445C15.319 8.5625 17.1875 8.88802 18.75 9.53906C20.3255 10.1901 21.5365 11.1536 22.3828 12.4297C23.2292 13.7057 23.6523 15.2747 23.6523 17.1367C23.6523 18.6602 23.3919 19.9688 22.8711 21.0625C22.3633 22.1432 21.6406 23.0482 20.7031 23.7773C19.7786 24.4935 18.6914 25.0664 17.4414 25.4961L15.5859 26.4727H6.36719L6.32812 21.9023H13.1836C14.2122 21.9023 15.0651 21.7201 15.7422 21.3555C16.4193 20.9909 16.9271 20.4831 17.2656 19.832C17.6172 19.181 17.793 18.4258 17.793 17.5664C17.793 16.6549 17.6237 15.8672 17.2852 15.2031C16.9466 14.5391 16.4323 14.0312 15.7422 13.6797C15.0521 13.3281 14.1862 13.1523 13.1445 13.1523H8.39844V37H2.53906V8.5625ZM18.4375 37L11.9531 24.3242L18.1445 24.2852L24.707 36.7266V37H18.4375ZM37.5391 37.3906C35.8984 37.3906 34.4271 37.1302 33.125 36.6094C31.8229 36.0755 30.7161 35.3398 29.8047 34.4023C28.9062 33.4648 28.2161 32.3776 27.7344 31.1406C27.2526 29.8906 27.0117 28.5625 27.0117 27.1562V26.375C27.0117 24.7734 27.2396 23.3086 27.6953 21.9805C28.151 20.6523 28.8021 19.5 29.6484 18.5234C30.5078 17.5469 31.5495 16.7982 32.7734 16.2773C33.9974 15.7435 35.3776 15.4766 36.9141 15.4766C38.4115 15.4766 39.7396 15.724 40.8984 16.2188C42.0573 16.7135 43.0273 17.4167 43.8086 18.3281C44.6029 19.2396 45.2018 20.3333 45.6055 21.6094C46.0091 22.8724 46.2109 24.2786 46.2109 25.8281V28.1719H29.4141V24.4219H40.6836V23.9922C40.6836 23.2109 40.5404 22.5143 40.2539 21.9023C39.9805 21.2773 39.5638 20.7826 39.0039 20.418C38.444 20.0534 37.7279 19.8711 36.8555 19.8711C36.1133 19.8711 35.4753 20.0339 34.9414 20.3594C34.4076 20.6849 33.9714 21.1406 33.6328 21.7266C33.3073 22.3125 33.0599 23.0026 32.8906 23.7969C32.7344 24.5781 32.6562 25.4375 32.6562 26.375V27.1562C32.6562 28.0026 32.7734 28.7839 33.0078 29.5C33.2552 30.2161 33.6003 30.8346 34.043 31.3555C34.4987 31.8763 35.0456 32.2799 35.6836 32.5664C36.3346 32.8529 37.0703 32.9961 37.8906 32.9961C38.9062 32.9961 39.8503 32.8008 40.7227 32.4102C41.6081 32.0065 42.3698 31.401 43.0078 30.5938L45.7422 33.5625C45.2995 34.2005 44.694 34.8125 43.9258 35.3984C43.1706 35.9844 42.2591 36.4661 41.1914 36.8438C40.1237 37.2083 38.9062 37.3906 37.5391 37.3906ZM60.8203 32.2344V22.8203C60.8203 22.1432 60.7096 21.5638 60.4883 21.082C60.2669 20.5872 59.9219 20.2031 59.4531 19.9297C58.9974 19.6562 58.4049 19.5195 57.6758 19.5195C57.0508 19.5195 56.5104 19.6302 56.0547 19.8516C55.599 20.0599 55.2474 20.3659 55 20.7695C54.7526 21.1602 54.6289 21.6224 54.6289 22.1562H49.0039C49.0039 21.2578 49.2122 20.4049 49.6289 19.5977C50.0456 18.7904 50.651 18.0807 51.4453 17.4688C52.2396 16.8438 53.1836 16.3555 54.2773 16.0039C55.3841 15.6523 56.6211 15.4766 57.9883 15.4766C59.6289 15.4766 61.0872 15.75 62.3633 16.2969C63.6393 16.8438 64.6419 17.6641 65.3711 18.7578C66.1133 19.8516 66.4844 21.2188 66.4844 22.8594V31.9023C66.4844 33.0612 66.556 34.0117 66.6992 34.7539C66.8424 35.4831 67.0508 36.1211 67.3242 36.668V37H61.6406C61.3672 36.4271 61.1589 35.7109 61.0156 34.8516C60.8854 33.9792 60.8203 33.1068 60.8203 32.2344ZM61.5625 24.1289L61.6016 27.3125H58.457C57.7148 27.3125 57.0703 27.3971 56.5234 27.5664C55.9766 27.7357 55.5273 27.9766 55.1758 28.2891C54.8242 28.5885 54.5638 28.9401 54.3945 29.3438C54.2383 29.7474 54.1602 30.1901 54.1602 30.6719C54.1602 31.1536 54.2708 31.5898 54.4922 31.9805C54.7135 32.3581 55.0326 32.6576 55.4492 32.8789C55.8659 33.0872 56.3542 33.1914 56.9141 33.1914C57.7604 33.1914 58.4961 33.0221 59.1211 32.6836C59.7461 32.3451 60.2279 31.9284 60.5664 31.4336C60.918 30.9388 61.1003 30.4701 61.1133 30.0273L62.5977 32.4102C62.3893 32.944 62.1029 33.4974 61.7383 34.0703C61.3867 34.6432 60.9375 35.1836 60.3906 35.6914C59.8438 36.1862 59.1862 36.5964 58.418 36.9219C57.6497 37.2344 56.7383 37.3906 55.6836 37.3906C54.3424 37.3906 53.125 37.1237 52.0312 36.5898C50.9505 36.043 50.0911 35.2943 49.4531 34.3438C48.8281 33.3802 48.5156 32.2865 48.5156 31.0625C48.5156 29.9557 48.724 28.9727 49.1406 28.1133C49.5573 27.2539 50.1693 26.5312 50.9766 25.9453C51.7969 25.3464 52.819 24.8971 54.043 24.5977C55.2669 24.2852 56.6862 24.1289 58.3008 24.1289H61.5625ZM79.5508 32.9961C80.2409 32.9961 80.8529 32.8659 81.3867 32.6055C81.9206 32.332 82.3372 31.9544 82.6367 31.4727C82.9492 30.9779 83.112 30.3984 83.125 29.7344H88.418C88.4049 31.2188 88.0078 32.5404 87.2266 33.6992C86.4453 34.8451 85.3971 35.75 84.082 36.4141C82.7669 37.0651 81.2956 37.3906 79.668 37.3906C78.0273 37.3906 76.5951 37.1172 75.3711 36.5703C74.1602 36.0234 73.151 35.2682 72.3438 34.3047C71.5365 33.3281 70.931 32.1953 70.5273 30.9062C70.1237 29.6042 69.9219 28.2109 69.9219 26.7266V26.1602C69.9219 24.6628 70.1237 23.2695 70.5273 21.9805C70.931 20.6784 71.5365 19.5456 72.3438 18.582C73.151 17.6055 74.1602 16.8438 75.3711 16.2969C76.582 15.75 78.0013 15.4766 79.6289 15.4766C81.3607 15.4766 82.8776 15.8086 84.1797 16.4727C85.4948 17.1367 86.5234 18.0872 87.2656 19.3242C88.0208 20.5482 88.4049 22 88.418 23.6797H83.125C83.112 22.9766 82.9622 22.3385 82.6758 21.7656C82.4023 21.1927 81.9987 20.737 81.4648 20.3984C80.944 20.0469 80.2995 19.8711 79.5312 19.8711C78.7109 19.8711 78.0404 20.0469 77.5195 20.3984C76.9987 20.737 76.5951 21.2057 76.3086 21.8047C76.0221 22.3906 75.8203 23.0612 75.7031 23.8164C75.599 24.5586 75.5469 25.3398 75.5469 26.1602V26.7266C75.5469 27.5469 75.599 28.3346 75.7031 29.0898C75.8073 29.8451 76.0026 30.5156 76.2891 31.1016C76.5885 31.6875 76.9987 32.1497 77.5195 32.4883C78.0404 32.8268 78.7174 32.9961 79.5508 32.9961ZM102.031 15.8672V19.8516H89.7266V15.8672H102.031ZM92.7734 10.6523H98.3984V30.6328C98.3984 31.2448 98.4766 31.7135 98.6328 32.0391C98.8021 32.3646 99.0495 32.5924 99.375 32.7227C99.7005 32.8398 100.111 32.8984 100.605 32.8984C100.957 32.8984 101.27 32.8854 101.543 32.8594C101.829 32.8203 102.07 32.7812 102.266 32.7422L102.285 36.8828C101.803 37.0391 101.283 37.1628 100.723 37.2539C100.163 37.3451 99.5443 37.3906 98.8672 37.3906C97.6302 37.3906 96.5495 37.1888 95.625 36.7852C94.7135 36.3685 94.0104 35.7044 93.5156 34.793C93.0208 33.8815 92.7734 32.6836 92.7734 31.1992V10.6523Z"
        fill="#1FA9CF"
      />
      <path d="M0 40.9062H103.027V42.8594H0V40.9062Z" fill="#1FA9CF" />
      <path
        d="M119.656 24.2031V37H117.45V24.2031H119.656ZM128.422 34.4248C128.422 34.2139 128.37 34.0234 128.264 33.8535C128.159 33.6777 127.957 33.5195 127.658 33.3789C127.365 33.2383 126.931 33.1094 126.357 32.9922C125.853 32.8809 125.39 32.749 124.968 32.5967C124.552 32.4385 124.195 32.248 123.896 32.0254C123.597 31.8027 123.366 31.5391 123.202 31.2344C123.038 30.9297 122.956 30.5781 122.956 30.1797C122.956 29.793 123.041 29.4268 123.211 29.0811C123.38 28.7354 123.624 28.4307 123.94 28.167C124.256 27.9033 124.64 27.6953 125.091 27.543C125.548 27.3906 126.058 27.3145 126.621 27.3145C127.418 27.3145 128.1 27.4492 128.669 27.7188C129.243 27.9824 129.682 28.3428 129.987 28.7998C130.292 29.251 130.444 29.7607 130.444 30.3291H128.326C128.326 30.0771 128.261 29.8428 128.132 29.626C128.009 29.4033 127.822 29.2246 127.57 29.0898C127.318 28.9492 127.002 28.8789 126.621 28.8789C126.257 28.8789 125.956 28.9375 125.715 29.0547C125.481 29.166 125.305 29.3125 125.188 29.4941C125.077 29.6758 125.021 29.875 125.021 30.0918C125.021 30.25 125.05 30.3936 125.109 30.5225C125.173 30.6455 125.279 30.7598 125.425 30.8652C125.572 30.9648 125.771 31.0586 126.023 31.1465C126.281 31.2344 126.603 31.3193 126.99 31.4014C127.716 31.5537 128.34 31.75 128.862 31.9902C129.389 32.2246 129.794 32.5293 130.075 32.9043C130.356 33.2734 130.497 33.7422 130.497 34.3105C130.497 34.7324 130.406 35.1191 130.224 35.4707C130.048 35.8164 129.791 36.1182 129.451 36.376C129.111 36.6279 128.704 36.8242 128.229 36.9648C127.76 37.1055 127.233 37.1758 126.647 37.1758C125.786 37.1758 125.056 37.0234 124.459 36.7188C123.861 36.4082 123.407 36.0127 123.096 35.5322C122.792 35.0459 122.639 34.542 122.639 34.0205H124.687C124.711 34.4131 124.819 34.7266 125.012 34.9609C125.212 35.1895 125.458 35.3564 125.751 35.4619C126.049 35.5615 126.357 35.6113 126.673 35.6113C127.054 35.6113 127.374 35.5615 127.631 35.4619C127.889 35.3564 128.086 35.2158 128.22 35.04C128.355 34.8584 128.422 34.6533 128.422 34.4248ZM132.847 32.3506V32.1484C132.847 31.4629 132.946 30.8271 133.146 30.2412C133.345 29.6494 133.632 29.1367 134.007 28.7031C134.388 28.2637 134.851 27.9238 135.396 27.6836C135.946 27.4375 136.568 27.3145 137.259 27.3145C137.956 27.3145 138.577 27.4375 139.122 27.6836C139.673 27.9238 140.139 28.2637 140.52 28.7031C140.901 29.1367 141.191 29.6494 141.39 30.2412C141.589 30.8271 141.689 31.4629 141.689 32.1484V32.3506C141.689 33.0361 141.589 33.6719 141.39 34.2578C141.191 34.8438 140.901 35.3564 140.52 35.7959C140.139 36.2295 139.676 36.5693 139.131 36.8154C138.586 37.0557 137.968 37.1758 137.277 37.1758C136.579 37.1758 135.955 37.0557 135.404 36.8154C134.86 36.5693 134.397 36.2295 134.016 35.7959C133.635 35.3564 133.345 34.8438 133.146 34.2578C132.946 33.6719 132.847 33.0361 132.847 32.3506ZM134.965 32.1484V32.3506C134.965 32.7783 135.009 33.1826 135.097 33.5635C135.185 33.9443 135.322 34.2783 135.51 34.5654C135.697 34.8525 135.938 35.0781 136.231 35.2422C136.524 35.4062 136.872 35.4883 137.277 35.4883C137.669 35.4883 138.009 35.4062 138.296 35.2422C138.589 35.0781 138.829 34.8525 139.017 34.5654C139.204 34.2783 139.342 33.9443 139.43 33.5635C139.524 33.1826 139.571 32.7783 139.571 32.3506V32.1484C139.571 31.7266 139.524 31.3281 139.43 30.9531C139.342 30.5723 139.201 30.2354 139.008 29.9424C138.821 29.6494 138.58 29.4209 138.287 29.2568C138 29.0869 137.657 29.002 137.259 29.002C136.861 29.002 136.515 29.0869 136.222 29.2568C135.935 29.4209 135.697 29.6494 135.51 29.9424C135.322 30.2354 135.185 30.5723 135.097 30.9531C135.009 31.3281 134.965 31.7266 134.965 32.1484ZM146.632 23.5V37H144.505V23.5H146.632ZM155.213 35.0928V30.5576C155.213 30.2178 155.152 29.9248 155.029 29.6787C154.906 29.4326 154.718 29.2422 154.466 29.1074C154.22 28.9727 153.91 28.9053 153.535 28.9053C153.189 28.9053 152.89 28.9639 152.638 29.0811C152.386 29.1982 152.19 29.3564 152.049 29.5557C151.909 29.7549 151.838 29.9805 151.838 30.2324H149.729C149.729 29.8574 149.82 29.4941 150.001 29.1426C150.183 28.791 150.447 28.4775 150.792 28.2021C151.138 27.9268 151.551 27.71 152.032 27.5518C152.512 27.3936 153.051 27.3145 153.649 27.3145C154.364 27.3145 154.996 27.4346 155.547 27.6748C156.104 27.915 156.54 28.2783 156.857 28.7646C157.179 29.2451 157.34 29.8486 157.34 30.5752V34.8027C157.34 35.2363 157.37 35.626 157.428 35.9717C157.493 36.3115 157.583 36.6074 157.701 36.8594V37H155.53C155.43 36.7715 155.351 36.4814 155.292 36.1299C155.24 35.7725 155.213 35.4268 155.213 35.0928ZM155.521 31.2168L155.538 32.5264H154.018C153.625 32.5264 153.28 32.5645 152.981 32.6406C152.682 32.7109 152.433 32.8164 152.234 32.957C152.035 33.0977 151.885 33.2676 151.786 33.4668C151.686 33.666 151.636 33.8916 151.636 34.1436C151.636 34.3955 151.695 34.627 151.812 34.8379C151.929 35.043 152.099 35.2041 152.322 35.3213C152.55 35.4385 152.826 35.4971 153.148 35.4971C153.581 35.4971 153.959 35.4092 154.282 35.2334C154.61 35.0518 154.868 34.832 155.055 34.5742C155.243 34.3105 155.342 34.0615 155.354 33.8271L156.039 34.7676C155.969 35.0078 155.849 35.2656 155.679 35.541C155.509 35.8164 155.287 36.0801 155.011 36.332C154.742 36.5781 154.416 36.7803 154.036 36.9385C153.661 37.0967 153.227 37.1758 152.735 37.1758C152.114 37.1758 151.56 37.0527 151.074 36.8066C150.587 36.5547 150.206 36.2178 149.931 35.7959C149.656 35.3682 149.518 34.8848 149.518 34.3457C149.518 33.8418 149.612 33.3965 149.799 33.0098C149.993 32.6172 150.274 32.2891 150.643 32.0254C151.018 31.7617 151.475 31.5625 152.014 31.4277C152.553 31.2871 153.168 31.2168 153.86 31.2168H155.521ZM164.814 27.4902V29.0371H159.453V27.4902H164.814ZM161 25.1611H163.118V34.3721C163.118 34.665 163.159 34.8906 163.241 35.0488C163.329 35.2012 163.449 35.3037 163.602 35.3564C163.754 35.4092 163.933 35.4355 164.138 35.4355C164.284 35.4355 164.425 35.4268 164.56 35.4092C164.694 35.3916 164.803 35.374 164.885 35.3564L164.894 36.9736C164.718 37.0264 164.513 37.0732 164.278 37.1143C164.05 37.1553 163.786 37.1758 163.487 37.1758C163.001 37.1758 162.57 37.0908 162.195 36.9209C161.82 36.7451 161.527 36.4609 161.316 36.0684C161.105 35.6758 161 35.1543 161 34.5039V25.1611ZM166.734 32.3506V32.1484C166.734 31.4629 166.834 30.8271 167.033 30.2412C167.232 29.6494 167.519 29.1367 167.894 28.7031C168.275 28.2637 168.738 27.9238 169.283 27.6836C169.834 27.4375 170.455 27.3145 171.146 27.3145C171.843 27.3145 172.464 27.4375 173.009 27.6836C173.56 27.9238 174.026 28.2637 174.407 28.7031C174.788 29.1367 175.078 29.6494 175.277 30.2412C175.476 30.8271 175.576 31.4629 175.576 32.1484V32.3506C175.576 33.0361 175.476 33.6719 175.277 34.2578C175.078 34.8438 174.788 35.3564 174.407 35.7959C174.026 36.2295 173.563 36.5693 173.018 36.8154C172.473 37.0557 171.855 37.1758 171.164 37.1758C170.466 37.1758 169.842 37.0557 169.292 36.8154C168.747 36.5693 168.284 36.2295 167.903 35.7959C167.522 35.3564 167.232 34.8438 167.033 34.2578C166.834 33.6719 166.734 33.0361 166.734 32.3506ZM168.852 32.1484V32.3506C168.852 32.7783 168.896 33.1826 168.984 33.5635C169.072 33.9443 169.21 34.2783 169.397 34.5654C169.585 34.8525 169.825 35.0781 170.118 35.2422C170.411 35.4062 170.759 35.4883 171.164 35.4883C171.556 35.4883 171.896 35.4062 172.183 35.2422C172.476 35.0781 172.716 34.8525 172.904 34.5654C173.091 34.2783 173.229 33.9443 173.317 33.5635C173.411 33.1826 173.458 32.7783 173.458 32.3506V32.1484C173.458 31.7266 173.411 31.3281 173.317 30.9531C173.229 30.5723 173.088 30.2354 172.895 29.9424C172.708 29.6494 172.467 29.4209 172.174 29.2568C171.887 29.0869 171.545 29.002 171.146 29.002C170.748 29.002 170.402 29.0869 170.109 29.2568C169.822 29.4209 169.585 29.6494 169.397 29.9424C169.21 30.2354 169.072 30.5723 168.984 30.9531C168.896 31.3281 168.852 31.7266 168.852 32.1484ZM180.378 29.3008V37H178.26V27.4902H180.281L180.378 29.3008ZM183.287 27.4287L183.27 29.3975C183.141 29.374 183 29.3564 182.848 29.3447C182.701 29.333 182.555 29.3271 182.408 29.3271C182.045 29.3271 181.726 29.3799 181.45 29.4854C181.175 29.585 180.944 29.7314 180.756 29.9248C180.574 30.1123 180.434 30.3408 180.334 30.6104C180.235 30.8799 180.176 31.1816 180.158 31.5156L179.675 31.5508C179.675 30.9531 179.734 30.3994 179.851 29.8896C179.968 29.3799 180.144 28.9316 180.378 28.5449C180.618 28.1582 180.917 27.8564 181.275 27.6396C181.638 27.4229 182.057 27.3145 182.531 27.3145C182.66 27.3145 182.798 27.3262 182.945 27.3496C183.097 27.373 183.211 27.3994 183.287 27.4287Z"
        fill="#424242"
      />
      <path
        d="M115 19H185C186.105 19 187 19.8954 187 21V40C187 41.1046 186.105 42 185 42H113V21C113 19.8954 113.895 19 115 19Z"
        stroke="#424242"
        stroke-width="2"
      />
    </svg>
  );

  /*
    return (
      <div className={styles.logo}>
        <h1 className={styles['left-side']}>
          React
        </h1>
        <p className={styles['right-side']}>
          Isolator
        </p>
      </div>
    );
  */
}

export default LogoHorizontal;
