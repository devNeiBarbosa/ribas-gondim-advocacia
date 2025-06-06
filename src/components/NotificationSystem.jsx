// NotificationSystem.js
// Este arquivo deve ser importado no seu index.js ou App.js principal

class NotificationManager {
  static show(message, type = 'success') {
    const container = document.getElementById('notification-container');
    if (!container) {
      // Criar container se não existir
      const newContainer = document.createElement('div');
      newContainer.id = 'notification-container';
      newContainer.style.position = 'fixed';
      newContainer.style.top = '20px';
      newContainer.style.right = '20px';
      newContainer.style.zIndex = '1000';
      document.body.appendChild(newContainer);
    }

    const notification = document.createElement('div');

    let icon = '';
    switch (type) {
      case 'warning':
        icon = '!';
        break;
      case 'error':
        icon = '✕';
        break;
      case 'success':
        icon = '✓';
        break;
    }

    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-icon">${icon}</div>
      <div class="notification-content">${message}</div>
      <button class="notification-close">✕</button>
      <div class="notification-progress"></div>
    `;
    
    // Estilos para a notificação
    notification.style.display = 'flex';
    notification.style.alignItems = 'center';
    notification.style.justifyContent = 'space-between';
    notification.style.backgroundColor = type === 'success' ? '#4CAF50' 
                                      : type === 'warning' ? '#FFC107' 
                                      : '#F44336';
    notification.style.color = '#fff';
    notification.style.padding = '12px 16px';
    notification.style.borderRadius = '4px';
    notification.style.marginBottom = '10px';
    notification.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    notification.style.animation = 'slideIn 0.5s ease-out forwards';
    notification.style.position = 'relative';
    notification.style.overflow = 'hidden';
    
    // Adicionar estilos CSS para a animação
    if (!document.getElementById('notification-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'notification-styles';
      styleSheet.textContent = `
        @keyframes slideIn {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideOut {
          to {
            opacity: 0;
            transform: translateX(100%);
          }
        }
        .notification-progress {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3px;
          background-color: rgba(255, 255, 255, 0.7);
          width: 100%;
          animation: progress 5s linear forwards;
        }
        @keyframes progress {
          to {
            width: 0%;
          }
        }
        .notification-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.2);
          margin-right: 12px;
          font-weight: bold;
        }
        .notification-close {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
          font-size: 16px;
          margin-left: 12px;
          padding: 0;
        }
        .notification-content {
          flex-grow: 1;
        }
      `;
      document.head.appendChild(styleSheet);
    }

    const currentContainer = document.getElementById('notification-container');
    currentContainer.appendChild(notification);

    const timeout = setTimeout(() => {
      this.remove(notification);
    }, 5000);

    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
      this.remove(notification);
      clearTimeout(timeout);
    });

    const progress = notification.querySelector('.notification-progress');
    notification.addEventListener('mouseenter', () => {
      progress.style.animationPlayState = 'paused';
    });

    notification.addEventListener('mouseleave', () => {
      progress.style.animationPlayState = 'running';
    });
  }

  static remove(notification) {
    notification.style.animation = 'slideOut 0.5s ease-out';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 500);
  }
}

// Expor o NotificationManager globalmente
window.NotificationManager = NotificationManager;