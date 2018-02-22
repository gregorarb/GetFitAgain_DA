using System;
using System.IO;

namespace FileCopier
{
    /// <summary>
    /// Kopiert Dateien und benennt sie entsprechend um
    /// Bei Physiotherapie-Übungen kommt es oft vor, dass man zuerst in eine
    /// Position geht und dann wieder in die Ausgangsstellung zurück muss.
    /// Damit man nicht 2 mal das gleiche rendern muss, können die Dateien einfach kopiert
    /// und rückwärts umbenannt werden.
    /// </summary>
    class Program
    {
        static void Main(string[] args)
        {
            if(args.Length < 1)
            {
                Console.WriteLine("Usage: FileCopier <FolderPath>");
            } else
            {
                try
                {
                    CopyFiles(args[0]);
                    Console.WriteLine("Successfully copied and renamed the necessary files.");
                } catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
            }
            Console.ReadKey();
        }

        /// <summary>
        /// Kopiert Dateien und benennt diese entsprechend um
        /// </summary>
        /// <param name="folderPath">Pfad zum Ordner, in dem die Dateien liegen</param>
        /// der Datei, die 50 enthält, also den 50. Frame</param>
        private static void CopyFiles(string folderPath)
        {
            string[] files = Directory.GetFiles(folderPath);
            // -2,  weil das erste nicht kopiert werden soll - das ist das in der Mitte
            for(int i=files.Length-2, j=3; i>=0; i--, j = j+2)
            {
                string sourceFile = Path.Combine(folderPath, files[i]);
                int number = i + j;
                string ending;
                if(number < 10)
                {
                    ending = "0" + number + ".png";
                } else
                {
                    ending = "" + number + ".png";
                }
                string destFile = Path.Combine(folderPath, sourceFile.Substring(0, sourceFile.Length - 6) + ending);
                File.Copy(sourceFile, destFile);
            }
            
        }
    }
}
