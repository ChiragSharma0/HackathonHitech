import React, { useState, useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import { motion } from "framer-motion";

const GhostFilterSelfie = () => {
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fearDetected, setFearDetected] = useState(false);
  const [filter, setFilter] = useState("none");
  const videoRef = useRef();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
    };
    loadModels();
  }, []);

  const startCamera = async () => {
    setLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      detectFear();
    } catch (error) {
      alert("Camera access denied!");
    } finally {
      setLoading(false);
    }
  };

  const detectFear = () => {
    const interval = setInterval(async () => {
      if (videoRef.current) {
        const detections = await faceapi
          .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceExpressions();

        if (detections?.expressions.fear > 0.5) {
          setFearDetected(true);
        } else {
          setFearDetected(false);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  const capturePhoto = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");

    const filterMap = {
      ghost: "contrast(150%) brightness(1.2) grayscale(1) opacity(0.7) blur(1px)",
      sepia: "sepia(1)",
      invert: "invert(1)",
      blur: "blur(3px)",
      grayscale: "grayscale(1)",
      haunted: "contrast(180%) saturate(0.3) brightness(0.8) sepia(0.2)",
      none: "none",
    };

    ctx.filter = filterMap[filter] || "none";
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");
    setPhoto(imageData);
  };

  const getVideoFilter = () => {
    const filterMap = {
      ghost: "contrast(150%) brightness(1.2) grayscale(1) opacity(0.7) blur(1px)",
      sepia: "sepia(1)",
      invert: "invert(1)",
      blur: "blur(3px)",
      grayscale: "grayscale(1)",
      haunted: "contrast(180%) saturate(0.3) brightness(0.8) sepia(0.2)",
      none: "none",
    };
    return filterMap[filter] || "none";
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* 🔥 Background floating horror light */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none blur-sm">
        <div className="w-72 h-72 bg-red-900 opacity-30 rounded-full absolute top-10 left-10 animate-pulse">
          {/* Spooky image inside circle */}
          <motion.img
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUQEhIVFRUVFxcVFRUVFRUVFRUVFRUWFhUWFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGi0lHyUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAMIBAwMBEQACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAABAgUGB//EADgQAAIBAgQEAwcCBgIDAQAAAAABAgMRBBIhMQVBUWETcYEikaGxwdHwMuEGFEJScvEjYoKisgf/xAAaAQACAwEBAAAAAAAAAAAAAAAAAQIDBAUG/8QALREAAgIBBAEDAwQCAwEAAAAAAAECEQMEEiExQRMiUQVhcTKBsfAjQqHh8RT/2gAMAwEAAhEDEQA/APjJoKymAFMQEQgCRJIDaALD00NCY/hol+NGTK+DsYWBtgjk5ZHdw1GyOlCG1UcvJO2XU6DYo/InW/F9SDNMBaMLO++vLuR6LXK1Rp09b9tfLyHXIt3FAcRGWjSW9tddCMrLMbjymVVeiX5f7gxxTTZz6yfW/f7FTTNcGkBqU+fovMg4likDyrZct3yI0uidy7KaTe+3O3y+IuGx20i6SbVuf5oNXRGVJ2MRwzta71/GPZwVPKjEKNmYs0aZpxStB/DKC2wVemJk0IVolbLUJ1ERJgGIkZsAGlEYi2wAFKQgM3FYwzLSJVhCIkIZrIAwkYDQiZRiYWkiaRXJnWwcDVjiYM8z0HCsPdnQ08LZxtTkpHblGxtOcmJ142u2yDL4O+Ec+pBNNrVvd9FbZdCurRri2mrKoyyrL0XxBOuBzW57jM5ZddLvd7vUOiSW7gHne3TrzFZLaip0rq70fn6MTQ1KnSFa0VsQZdBvsTnU56faxW5eTTGPgXlW59bfjK3MtUCqW+vW/uFHjsJdDNJPVpW0LUUyryP4eDcL8/l3JpcGWckp0Lz/AFfcxaiPFmzTy8B0ZDUVKF0RJo5uKpEWWI5laJBliF2iJIiQwI2AApSE2Bi5EZAALctIFXAZcZCA3mAA0GMCSZNEGHw8dS2CKZvg7mBga4I5eeR6bhULK50cCqJxdTK3Q9UktS8zJHOrzTu2Vto1wi10JKy093L3kDRy+RWrUV7p3ItovjF1TB1JPVK997ib+CcUu2bimneW/cfnkg6apFVqt7q/ufwBuyUIVTEpO61d2unQqZpSp8IUlZ2votdGV8MvVq/kw48l3suyV7sjXhEr8sLSprR6vqTjFEJSfQ/BrLrbYt8GRp7uAtGpaN2CdIhONypCtasn27FGRpo0YoNM1CZzXwzoBFLkJDQnirCZNM5dZFbRahdwAkYkhABlcTGZsRGQQFAARotIGWIZpABaABqmhgVJakkRY3h0XwM+To7OCZsgcrOj0GDrWijoYn7UcnLC2xrEVUWsphFnMr1Mrcm/JL3lUnTtmyEdypCNSWbd2TK3yaorZ1yyqlo9O3lbkg6HG5GPG9X16XCyWwypZn9NdBdjrajUMNbfnfVdx7SLy30Zq08t3y6fmwmqJRlu4FK9C+vJa7elyuUbL4TrgUUEtnfuVpI0bmxulh2WKJRLIhmTjlav01+iJ8UUpS3JnIxOLa0TMWXM1wjfjwp8tC9PEp8yhZYvsteNro6saqdrcrL9yucadgnaC5yK7AUxBJocWJTiVtFqYGSIFiMMiySMNCGZcRMAUkIDFwALctIkQhm7ABkBDEGAy76k4kGM0GXxKZo7GCZfGRgzQOrRnsjfhlaOXljTG/EvHyNF2jPtpi7pX+fvIUWqdCWIS8viQZpx2KzTb20/NyL5L40kbjAZFsJCntYaRCUgtSStrtHo7Xl9iTK4p3x2/wCBR1Iu83z/ABFdrs0bZKomFjfEeWK5cyKybuiXoemrbBxobttAok3k+AsqyWjd3yS29WNySK1By5ONxDHttxjt9Tm6nVU9qOnptLxuZz3Tkzmyz2dFadmoQZKOSyueJo6eBn9jVGW5UY5KmP5RpEGynSuTBMBVp2KpItixCuVMtTEpyIkwbqCGRVBDLzCAoBmWybIlxYgCKZICXGI2pCGEiWIgxikyxMrZ0sNWsWxZlyo6uEqXN2B+Dl515HqL1sa0zHJcWEpp7K7JIjJrtgMbhkvaa7e8jKPktw5W+EBhS11a627EUixzdcI06HRWX5t3HQvU+SpUna3zCgUlZy+KJxV1tz79yjLcVaNumak+TnfzP/GZ/U/x2bPT/wAgbhNVKLfN/Ilp5LbZXqotuvAxi8Yox12f0LcmRRXJTiwty/BycRi0o6by5dEYM2dRjx2zoY8LlLnpFcOwufVnDzZD0Wk0+49BS4XdXS23dtvMwyzJOmzsx0qoRxmBsXY8rsx6nSqhKlozq4ZnmtRj2s6mG1N8IWc+UqGJUraljgQUxPFIonEvjI4+JM8kXxYlMrZagTIkkZEMtMQF5wGaRYRJYQFoYGkxiNxGgYaJYiAWDHZFodw7LIMz5EdXCytZmzFKmc7NG0dSnLU3pnPkuBqdZQ1sWOVFCg5nPxGNXW73sVOaNcMD+BNY2N317PoQ3o0ehKgn8w+u/Tl6j3EfTXwXGtdK707fIe6xOFPg5/F8VdNbrty0KM8/azXpcVNM85Gs9U9uRylkfTOs4LtG6Vdx0JQyOHBGUFIFWr3KsmSycYUL5rszSdl0VR6Xgs1ZHPzI9DoZKj7V/A/8WYGhgvBq+zOOZyWRy8W7bTulZ6WVn0KsWWEIuMlbf27/AL9yGt0WfLm3w5XHnr+/Y+WcarRcpyissXKTjH+1Ntpei0IYk6R0M7qNM81Op7R19OeU1lNnewdL2V5HoIQqKPN5cnuY5bQU1SJY5ts5+MhZPsYZyt0box4OHiSiRdARmVMvQJkCSMiGUAFCGGSLSJYAQAIkABoFiIs2mOxBIsViodw7LYsomjqYdmqBz8qOpQ1SOjjdxObPhiXGqnnsV52aNJE8viqzvucrLkkn2dvHBUJyrPqZnlZoUEM4evU5N/MFrJR8klo1PwMQxdWO7ZZDXvyyOT6cq6F8TinPdryWhOeb1O2VxwrHwhXPqVbuSyuD0OM4WnBSV07HVy6aMo/c5WLVNTa8HnMRQlF2aOPlxyg+TqwmpLgCUlg/gcZlKMkLNun1Gw7VPiqtuZniZ1Y61UJYziGbRFuPCzHqNZaJw/DO+aex3NJptnukec1Wo3WondjiEkdJySOT6TbIsTdqxnyStcGnHDb2Zx81ql0+uhg8mxnAxBGROIlNFLLkBZFk0ZEMoAIIA8S0CmIRQAEiiaEzaZIRMxFsKNwYJgx2gyyLKZo6uFZrgzm5jrYLXQ34H4OZm45FeNR02DP0X6R8nksXuzi5e2d3F0Bw1HMzDklR0cENzPTcO4deySu3okldt9Ejn5MvyehwaZJDvEuCTpezUpyg2rpTi4trqrkI5bZa8MJxuLT/AByeT4nhcrN+KdnD1eHawfB8K6lWK5J3fkjpaPH6mRfbk42qy+njbOzxT+IUr06cbpaN/Y359eovbFWc/T/T2/fNnJhioyVpbvrsZo54zVPs3vE48oXrYV8l5oz5MD/1LY5F5FrGfay2w1KDdtbJuxKOKweShunFKKcVdt216myEIxinFcszSk5Se7ofw1GUqmVvSFr+djVCMpTpvoyZJxjC0uzVatrljyI5MlvbEIY6W6Qei2K+BUbr7eZmfZaujmVkVssiJVSpl6ASIEzADKEBAAYiWAYkICRGhBUWIiRsTY0VcjYwkGNCG6EicWVSOnhZmrGznZ0dzhj19Do6bs5OoXBfFaOam2uT+hbmjceA009s0meKxa1ZwcvbPR4uisA7SOfmXB19HJKR77+DeLRw2IpV5RzKDba0vZxcbrur39DmytSUvhnoZQ9bC8adWeo//Rv4voYyFOFGMvYbk5TST1VsqV9ufoieXJ6sk0qoz6HST025za58I+RcamjThXJj10kDw9KVGlOW0pJLurnexY5YMUpPtnmcko5siXhHIOebSn2IuvAHW4bSlUjK28Fe/Y6OmUskH8ox55xxyV+R2jgoypeJ038no36GqOGEobjNLPKOTYBeAsn/ANXf06og9Okq+CxZ7f5N0KSSzS0UZX+a+qJRgkrfhkZzb9sfKC0p5aUqj3qSbXrovkJS2Y3P5ZFx3ZVDxFClEyQNEzp0Kel+fIlOVcFaXkxi3y6JFTZM59UqZZESqorZcgEiJJGGBIoAIADEUSAFMQGoImhM22SYjDZBskRMQG4sdiD05kkyuR0MLUNOORjzRPQcIneVux0dLL3UcfVRpWdevTvTa63N0lcaMEJVkTPH43hUnc5WXSOXR6DDqoo5suHVou+R+a1Rz8miy/B0cOtxJ/qHMLiJrTK/cYZ6LK3xE7WH6njiuZIZnVqSWkWPH9OzPwPN9ZwJfqKwnCZOWee61S5eZ2NJ9P8ATe6XZ5vW/VfU9sejXEcO6lKTSu8z+GvyNmeDniddmXBkUMqT6o4vDeFOqpSbSUeXNvkrHN0+keRNs6GfVLE1H5GuI4Ckstp3qf1q1l6GnNp8drnnyUYM+V3cfb4Onw1QhBt2u1b0NmJRjEyajfOao1wGSanFrTkn0YtO07RHWppxaF6dXSUHbNFW87bfAjGXDT7RbKPKkumK4qvFxcb3zR181/opy5IuNfKL8cGpX8MXxOIzKMeWr+i+CMubLuqKL8ePa3IPhVt3/YUGRmjrUo/T6fuNryRTF8bH2mVNDfZz6sStosTE60SDLExdxI0Tsy4gOynEQzNhAHT0JEgT3GhG0TREzKRFskkZuQsZLgBeYdiNwmNMi0O4aoWwkZ8kTv8ACcRaa93vOjpZ1NHJ1WO4s9H4ysjrWcjY7LhQjN5no9rW08xUnyJ5JQW1A50of3LQTSJqU/gF/LR30d9rIjsRP1JdAZ1Ir+nTbXrqLhFkYN+SsJTc8s1zWq+w4q+R5ZKFwZpxhFSurJtW83zHwhXKVU+Tm1qavLw4pSb1f1SKnFc7ezXCTpb3x/fJysTkg8qaUv6m3dmWbhB0nyb8e+a3NceAdTF04q122ra9CEs+OPFko4sknZnC8Qgm7O1/kRx6mFjyaeTXJmrXWZz2TFLIr3eCUYPbtObKp7KST0vr1MDm9qSNajy2GqwtGD6oohO5MnOPCHcHL2V2f0X2NUGZpo7lB/T4/wCyxvgr8g8TT1ZETEatMg0NMTrUyDRNSF3TFRLcZdMjRLcDlTFQ1Ix4YqJbjSWgi0E1qTREjYNgjJW2SJYANZQAlgAtIYhqgySZXJHUwtQ145GDNA7mErXs7+dzr4p7lZycuOuBj+ctzuW+pRV6N+BGWNs9faXNW+KKXlpmlYbXHA7HFZknGzjs77379+5ap2rXRneKnUuGbcFJqz7We9+j+hLsW5xTslfEZbZUtOWyu/vr6sblXQoY9/Yli8RGd3mcXs1La/axXKSZpxY5QaVX+Di4nF1Jtxo/0fqqXVvRsxZMs5txxeO2dHHhxwSeXz0v/DixjmnabeusnuznqLlOpP8AJ0G9sfag/EOH5IqpG6i9k99ebLNRp9kd8eirDn3y2PsLSwMZ0HUX6kvkTjp4Tw7l2RlnlDNsfQph8M6kXK+q0S9DPjwvLFyb6Lp5FjaVC8E27XsZ7bLi1N7PkJfImdHh89JLyt57fUvg+CmSO7g6mnmvk7fYtZSHrMEQkJ1ZICNidVXItAmCyColuJkFtDcZlSFtJKQPwhbSW8SjIqRtMSZIiYbINjImIZeYAJmACZwAtTARuFUYmhzD4guhKjPkhZ08PiDXDIYsmMcjO5oWRmdwMVGS3eUNIw8S077Pryl/kvqHqfsyXpJqvH8fgZwtfO7J5JW1T1T6LuujL4T3fZlOSG1cq1/f+S6lWa2Wabdrd/6rfVPzJOTXXLFGEH26S8/x/wBGcLg415VPFTUoezlvtdfq05kYwWVvf4HkzPBGPp9PycXhlNKs6E9rvnu1tfqYtOtuV4mdLUSbxLLEBx2Vqistla/Uq1r25E0T0avG7H+ILNQunyX3Nef34eDPh9uamJ/w/N+1DkzNoJdxLtbHhSMcIqqM5Q5XdvS5HSTUZygT1MW4KQrRh/y2fWXlzM2NXlaf3L5OoX+AM935sqomM4KWku2vuJxftISXJ2MLW1S7/wD0rotTKWuRjE19F5tfIEyqaE51R2QoxnFYUTOFhRWcLHRpMkhEGLk4iZjR0ymwbAyRGQQEACDAlgAuwAWgAPSGmQaOhh5FsZUUTgdKhI0wmZpQDzjdGiEvBTKPkSxCCY4CE6sk1rtt+3Yz+pKL/BqUYtHVweKanGvncktJ2Vks0db/ANzVt+xvx5LayX+f3MWXEnB4qq+v2/gPxCt4OKjUv7NRZXrp2ZPLL08yl4fBTgh62mcPMTkcWeStGr/2+H+mZNT/AI8scn3OhpvficPsG4xRjKObf2W1Z87b+QvqEbgpL5DQy9zixPhtfNTlTfJO3kR0uTdicH4J54bZqYngqip1U3ts/UyafIoZLZpzQ3QaQOrUSqOUdr3RGU9uVyj8jjG4JME5cyu+bJ0S4WAfBSWaz2ej9dCWPyRkN06tlHqnZ/8AjL9ycX0QlEJjMRr6sW7gg42A8YW4Wwnij3C2F+MG4NhXjBuHsCQrE4si4BPFLLIbTkGOzeWKwIIC7ABLABLABAGQALQxB6YEWN0mSRCR0MPIvgZ5jsWaYmeQCvC5oa3IqTpnKxUfgY8iNmNjnCWpU6lPnK7j/kl9dTVpXuxuK7KNStuSM/C7/ACjifFoOlL9UE7X3sv0+5qxDHk9bC8cu0WSxelmWSPT/v8Ayc+ris8LSeqWj622+Bllm9THT7Rqji2SteQuGxt6bpyf6f0+XNDjm34Xjl34IvFtyrJH9xPB4h05Zlrya6plGHK8ctxblxqcaYKpK7b6srk7bZNKlRkQy0goCABulKzRKDpia4GpT0f+T/8AZX+aJCoDVqXbZGXYqMKYgo1nCwomcLCis4WFFxqEkxOIXxSzcR2iyKC4gAWFAXcKCygoCBQWSw6FZaiOgs3GA6I2M0qLBIi2N0aJYolUpHQoUi6MSiUhyMDRFFEmYqI0RjRU2cvHQM2eBqwyBYLpe1+a3i+q9bP0DAuP7wWZef72c2q505vW0rtPv195im54sjfk1R25IL4F2yluywoQyJXGlYBaUE0+q1LIRUov5ISdNA0iuuCdhIU7rz2fdWv80PwIxN8+u/mKqGZQkAzN6SX+L+H7k3zYhdsiwIICXACXACABLgBeYlYUayioCWHQFqIxF5QA0oABapgFGlTCwo0oBYUHo07huFR0aGHBSIyHIUEXwM02FjCxqhCzNOYaMTZDFRknlsHOBY4iUjn46mUZomrDI50ZOL89GZYtwZsaUkXjKXiQv/VH4rl8B58fqQvyhYpbJV4ZzlFOne3tKW/ZpGFRTxX5TNVtTrxRSo626xuvOwenbpfFj38X9y6VklLo7P1CFJKXwxS5bRtrLO/JllbJ34Yv1RBtWlYrqpUSTtGM1vQhdEjLIjIgQgt/ab/NCz/YXgCVEiABAAgAQAIAFgIYUR2OjXhhYUXGCFYUEUUKxlqwWBaYARsBApSGINh5AROrh2OJVIbhM24o30ZMkg8Tp44UjBOVm4suRUyqugMlHkXxFpIhKmi2FxZxqtN3y/ExSi72nQjJdkwr0cXz0v8AnceLhNMMnaaE/Bd5tL2be0jL6bTk0uPJfvXtT7BeJaz5x+RXvqn8fwWbbv7mZW9ro9SLrn4Y1fBFCUkkotsNs5JJLkLjHlsupRldZ/Zflr7uQSxyv38CjNV7eQcbX2IR4ZN9FSTE0/IJlRQkhhK0tCc3SIxFykmQAIAEACwAgAQAGVIQFuQgIpABrMIZM4BRamA6LTCxURokmRaD0IjItj9JMsxwbdIonLgbpQOvhxbUc7JK2MwZqRnZc6lhtiURarW6sg5F8YCVWo1qmymUmuTRGKYlVqNrfmZ5ybRojFJh6FNNa76L4lkI3HkrnJp8AaqnTnnjqtn06WKpqeOe6PK8lkXHJDayYfGwp3i4X05pO8ruz17P4Chmhj4cQnhlPlSD1uJQUU4RjfTSy0fXYtlqYKCcUrKo6eW5qTYCWNU42ae+tuhW9QpxpotWFxlaYrVbU3K91fcolcZ7i6NONA6jT1K5NN2SXwXVh8RzXIRZFCybFtpWO7FpszydssRkQEACABYAQAIAEADaZEZpCHRoB0QQUXcBmkwALEAYenTuSSK5MZp0DRjg5OkZsk6R0MPQOrg06hyc7NmsKomhIobNzfMkxRQpWxPIrczRHF5EMRPUz5GzTBcA412vsRWRok4WSSjNaPXoD2zjx2NXF8gaOIcXr7nzKoZXF0yc8akuDs03GpHRc7nQi45EYJbscuWK4rBbO3n8inJhT5LsebwJ/wAhe/L82M//AMyZf69BaPDnz2Jw03yQlqF4MywLvvZX0E9O774JLMv3BPBK7f8ArzK3po3ZL1mZkkRaRJCuImZ8sqLoIWM5YQAIAFgBAAgAQAKADaIkjSEMuwAaURWM0oisdBIRCwoZpQAix6hTLYRsonIajFHX02LarZzM+Tc6QxQkbYsyzRVSQMIoVq1SDZfCBz6k9TNKXJqiuAdaRCbJxRmg1sxY68jnfgzVotaojPG48ocZp9mLraXv5ojcepDp/wCoTDVXTe94vmuRLHJ4n3wyM4rIuuTrz4pDKo2uut9rc7G56iNIwrSy3N2Dck/aT036ILT5TJpNcMqMm9Lq3O1tWJO/I2kvADFzfkk+ur9CrLJ/sWY0v3EniHr8DM8rNHpi8q1tSiWRItUBWUr6mZtt2y1KihAQAIAFgBAAjGwIICAARECaNiGS4AWmAWaQhhqcQE2OUaZNIqkx6EbI26fHuZjzTpBYROskc9sjrKI9yQbHIFWxCWpGU0iyGNsQq1mzPKdmmMEhaE9SiMuS1rgupUe3Icpy6BRQHNqV3TJ1wN0sQnoaYZU+ymUKKdBNieJNj3tIA3Km2nt05FFyxSp9FlRmrXYKcWvajp2ISi17ok0/DNLHu1pNgtVLqQvQXaIsV0Yev8MPT+SniVzYnmT7YemwFStcpnlvosjCgLZUTIAEACABEAFjAjACCAgAQANoiSCJEbJF5QsKNRgKx0Hp0yNjG6VMEQY5TikXwRRNm3I7GDHsic7LLczWfRmmynaczGVDHnkbMUQFGryZXjnfDLJR8o1KRNsSQCO5Sv1Fj6N1ammhOc1XBGMRbMZ7LqCRlYsTog1YWli3syyGd9MhLEhmtDOtdy+cd6KovaxRwa05ozOLXBdafIvWpmfJAtjIAUFhQAQAIAEACABYASw6AggLQ0uAKEBAAgAaTIkgqZFkkXcQETYDCwk+rEKxiE31fvGiDC+I+r95oxfqKprgiqPq/edFSfyY3FfBUqj6v3j3P5Gor4Eq8nfdmXI3ZoglQKL1IRbsm+jbk+pY2yCSB1WyqTZOKLi9iSYMqbItgiJhYy6bHFiY9Sk+rNkZP5M8kjFeb6shOTHFIBOTs9Spt0WJcicjG+y9FCGQAIAEACABpEkItDQimIkRMEIoQyCAgAf/2Q=="
            alt="Spooky"
            className="w-full h-full object-cover rounded-full opacity-60 animate-pulse"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
        <div className="w-52 h-52 bg-purple-800 opacity-20 rounded-full absolute bottom-10 right-10 animate-ping">
          {/* Spooky image inside another circle */}
          <motion.img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkkpjbBNSXbkjQfyo2Q67bkdrVz-sMibSX_Q&s"
            alt="Spooky"
            className="w-full h-full object-cover rounded-full opacity-60 animate-ping"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* 🎃 Title */}
      <motion.h1
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 1 }}
  className="text-5xl font-bold text-red-600 text-center z-10 relative drop-shadow-[0_0_10px_#7f1d1d] mt-6 mb-6"
>
  <span className="mr-4">👻</span> {/* Increased right margin */}
  Ghost <span className="mx-4">Filter</span> {/* Increased horizontal margin */}
  Selfie
</motion.h1>


      {!photo && (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            style={{ filter: getVideoFilter() }}
            className="w-full max-w-md rounded-lg shadow-2xl border-4 border-purple-700"
          />

          {fearDetected && (
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-b5ct7jcE1iHOZQgU9U69TXwn5iHaYjiO8A&s"
              alt="Ghost"
              className="absolute top-0 left-0 w-full h-full opacity-60 animate-fadeIn pointer-events-none"
            />
          )}

          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {["none", "ghost", "haunted", "sepia", "invert", "blur", "grayscale"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-md text-sm font-semibold transition-all duration-300 ${
                  filter === f
                    ? "bg-purple-700 text-white shadow-md scale-105"
                    : "bg-gray-800 text-gray-300 hover:bg-purple-600"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex gap-4 mt-6 z-10 relative"
          >
            <button
              onClick={startCamera}
              className="bg-green-600 px-5 py-2 rounded shadow hover:bg-green-700 hover:scale-105 transition-all duration-300"
            >
              {loading ? "Starting..." : "Start Camera"}
            </button>

            <button
              onClick={capturePhoto}
              className="bg-blue-600 px-5 py-2 rounded shadow hover:bg-blue-700 hover:scale-105 transition-all duration-300"
            >
              Capture Photo
            </button>
          </motion.div>
        </>
      )}

      {photo && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mt-10"
        >
          <img
            src={photo}
            alt="Captured Selfie"
            className="w-full max-w-md rounded-lg shadow-2xl border-4 border-purple-800"
          />
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setPhoto(null)}
              className="bg-yellow-600 px-4 py-2 rounded hover:bg-yellow-700 hover:scale-105 transition-all"
            >
              Retake
            </button>

            <a
              href={photo}
              download="ghost-selfie.png"
              className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700 hover:scale-105 transition-all"
            >
              Download
            </a>
          </div>
        </motion.div>
      )}

      {/* 🕷️ Spider Web Corner (Optional spooky deco) */}
      <img
        src="/spiderweb-corner.png"
        alt="web"
        className="absolute top-0 right-0 w-32 opacity-20 pointer-events-none"
      />
    </div>
  );
};

export default GhostFilterSelfie;