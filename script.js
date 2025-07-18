    const heatmapContainer = document.getElementById("heatmapContainer");
    const btnStop = document.getElementById("btnStop");
    const btnResume = document.getElementById("btnResume");

    const heatmap = h337.create({
      container: heatmapContainer,
      radius: 40,
      maxOpacity: 0.6,
      blur: 0.85
    });

    let gazePoints = [];

    webgazer.setGazeListener((data, elapsedTime) => {
      if (data) {
        gazePoints.push({ x: Math.round(data.x), y: Math.round(data.y), value: 1 });
        console.log(`Mirada: (${data.x}, ${data.y}) - ${elapsedTime.toFixed(0)} ms`);
      }
    }).begin();

    webgazer.showVideo(true);
    webgazer.showPredictionPoints(true);
    webgazer.showFaceOverlay(true);
    webgazer.showFaceFeedbackBox(true);

    btnStop.addEventListener("click", () => {
      webgazer.pause();
      btnStop.disabled = true;
      btnResume.disabled = false;
      heatmapContainer.style.display = "block";
      heatmap.setData({ max: 5, data: gazePoints });

       window.scrollTo({
        top: 0,              // Desplaza al top de la página
        behavior: 'smooth'
        });
    });

    btnResume.addEventListener("click", () => {
      webgazer.resume();
      btnStop.disabled = false;
      btnResume.disabled = true;
      heatmapContainer.style.display = "none";
      heatmap.setData({ max: 5, data: [] });
      gazePoints = [];
    });